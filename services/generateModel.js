const XlsxPopulate = require("xlsx-populate")
const XLSX = require("xlsx")
const lodash = require("lodash")
const moment = require("moment")

const generateModel = (res, readFile, writeFile, response, request) => {
    let responses = res[0]
    /*  DEFINE FUNCTIONS
        ------------------------------------------------------  */
    /*  Shifts a column reference, 'ref', by 'd' displacements in the alphabet. d can be either positive or negative.
        e.g. shiftCol(A, 5) = F  */
    const shiftCol = (ref, d) => {
        // Converts ref into a number and applies the displacement. Number cannot be negative.
        let n = Math.max(ref.split("").reduce((r, a) => r * 26 + parseInt(a, 36) - 9, 0) - 1 + d, 0)

        // Converts number back into a string of letters.
        let result = ""
        do {
            result = ((n % 26) + 10).toString(36) + result
            n = Math.floor(n / 26) - 1
        } while (n >= 0)

        // Returns result
        return result.toUpperCase()
    }

    /*  String Method. Replaces the character at position 'index' of the string with the specified replacement. 
        e.g. 'abcde'.replaceAt(3, 'x') = 'abxde'  */
    String.prototype.replaceAt = function (index, replacement) {
        return this.substr(0, index) + replacement + this.substr(index + replacement.length)
    }

    /*  Given an Excel formula expression 'formula', column displacement 'colDisp' and row displacement 'rowDisp', shifts every 
        cell reference in the formula by the specified displacements. Ignores cell references that are locked (e.g. '$A$1'). */
    const shiftFormula = (formula, colDisp, rowDisp) => {
        // Regex to detect every cell reference in the formula expression
        const formulaRegex =
            /('?[a-zA-Z0-9\s\[\]\.]{1,99})?'?!?\$?[a-zA-Z]{1,3}\$?[0-9]{1,7}(:\$?[a-zA-Z]{1,3}\$?[0-9]{1,7})?/g

        // Regex to detect every column reference in a cell reference
        const charRegex = /(?<=^|:)(?<!\$)[A-Z]{1,}/g

        // Regex to detect every row reference in a cell reference
        const intRegex = /(?<=[A-Z])(?<!\$)[0-9]{1,}/g

        // Find all cell references
        let cellRefs = [...formula.matchAll(formulaRegex)]

        let newFormula = formula

        cellRefs.forEach((cellRef) => {
            // If cell reference begins with a Sheet reference, remove the sheet reference
            let newCellRef = cellRef[1] ? cellRef[0].replace(cellRef[1], "") : cellRef[0]

            // Find all column references in the current cell reference and displace them by 'colDisp'
            const colRefs = [...newCellRef.matchAll(charRegex)]
            colRefs.forEach((c) => {
                newCellRef = newCellRef.replaceAt(c.index, shiftCol(c[0], colDisp))
            })

            // Find all row references in the current cell reference and displace them by 'rowDisp'
            const rowRefs = [...newCellRef.matchAll(intRegex)]
            rowRefs.forEach((r) => {
                newCellRef = newCellRef.replaceAt(r.index, String(Number(r[0]) + rowDisp))
            })

            // Add back sheet names
            newCellRef = cellRef[1] ? cellRef[1].concat(newCellRef) : newCellRef

            // Insert new cell reference into the formula
            newFormula = newFormula.replaceAt(cellRef.index, newCellRef)
        })
        return newFormula
    }

    /*  Given an xlsx-populate workbook, Excel sheet name, starting column and starting row, shifts every cell in the range 
        (defined as ending on the last non-empty cell in the sheet) to the bottom / right (if dispXXX = 1) or to the top / left 
        (if dispXXX = -1). This function is run once for each row that is added. A nonce is passed because the function runs 
        differently depending on whether it is being run for the first time. */
    const updateSheet = (workbook, sheetName, startCol, startRow, dispCol = 0, dispRow = 0, nonce = 0, array = []) => {
        // Uses XLSX npm package to read Excel file. XLSX does not preserve formatting but it is helpful
        // for parsing and generating formulas.
        let xlsxWorkbook = XLSX.readFile(readFile)
        let sheet = xlsxWorkbook.Sheets[sheetName]

        // Generates a range object of format {s: {c: START_COLUMN, r: START_ROW}, e: {c: END_COLUMN, r: END_ROW}}
        let rng = XLSX.utils.decode_range(sheet["!ref"])

        // Iterate over each column (starting from the last column), and transpose all column references.
        if (dispCol !== 0) {
            if (nonce === 0) {
                // If the function is being run for the first time, initalise 'array'
                for (let colNum = rng.e.c; colNum >= startCol - 1; colNum--) {
                    let col = []

                    for (let rowNum = startRow - 1; rowNum <= rng.e.r; rowNum++) {
                        // Define a variable, cellOld, which represents the source cell to copy from.
                        let cellOld = sheet[XLSX.utils.encode_cell({ r: rowNum, c: colNum - dispCol })]

                        // Add row object to the column array with four cell attributes, column, row, type and value.
                        if (cellOld === undefined) {
                            col.push({ sheet: sheetName, col: colNum, row: rowNum, type: "undefined", value: "" })
                        } else if (cellOld.f) {
                            col.push({
                                sheet: sheetName,
                                col: colNum,
                                row: rowNum,
                                type: "formula",
                                value: shiftFormula(cellOld.f, dispCol, 0),
                            })
                        } else {
                            col.push({ sheet: sheetName, col: colNum, row: rowNum, type: "value", value: cellOld.v })
                        }
                    }
                    // Add column to array
                    array.push(col)
                }
            } else {
                // If the function has been run before, take the 'array' variable that has been passed in and continue working on it.
                // Create a deep copy of the last column in the array (effectively the first column in the range as columns are stored
                // in reverse order), and advance each existing formula in the array by one column.
                const newCol = lodash.cloneDeep(array[array.length - 1])
                array.push(newCol)
                for (let colNum = 0; colNum < array.length - 1; colNum++) {
                    array[colNum].forEach((row) => {
                        row.col = row.col + 1
                        row.value = row.type === "formula" ? shiftFormula(row.value, dispCol, 0) : row.value
                    })
                }
            }

            // Iterate over each column (starting from the last column) and fill in the cell contents and style.
            const fillContentsAndStyles = (c, r, d) => {
                const styles = [
                    "bold",
                    "italic",
                    "underline",
                    "strikethrough",
                    "fontSize",
                    "fontFamily",
                    "fontColor",
                    "horizontalAlignment",
                    "verticalAlignment",
                    "wrapText",
                    "shrinkToFit",
                    "textDirection",
                    "textRotation",
                    "verticalText",
                    "fill",
                    "border",
                    "numberFormat",
                ]

                const cellNew = workbook
                    .sheet(sheetName)
                    .column(c + startCol - 1)
                    .cell(r + startRow - 1)
                const cellOld = workbook
                    .sheet(sheetName)
                    .column(c + startCol - 1 - d)
                    .cell(r + startRow - 1)

                // Copy array contents to spreadsheet.
                const contents = array[array.length - c][r - 1]
                if (contents.type === "undefined") {
                    cellNew.clear()
                } else if (contents.type === "formula") {
                    cellNew.formula(contents.value)
                } else {
                    cellNew.value(contents.value)
                }

                // Copy styles from old cell to new cell.
                const style = cellOld.style(styles)
                cellNew.style(style)

                // Insert an empty column after the last column in the range, to ensure the program runs correctly on the next iteration.
                if (c === array.length) {
                    workbook
                        .sheet(sheetName)
                        .column(array.length + startCol)
                        .cell(r + startRow - 1)
                        .value("")
                }
            }

            // Fill contents and styles in reverse order if dispCol === 1 (i.e. we are adding a column), and fill them in
            // ascending order if dispCol !== 1 (i.e. we are deleting a column). This helps to ensure the styles are correctly copied.
            if (dispCol === 1) {
                for (let c = array.length; c >= 1; c--) {
                    for (let r = 1; r <= array[0].length; r++) {
                        fillContentsAndStyles(c, r, (d = 1))
                    }
                }
            } else if (dispCol === -1) {
                for (let c = 1; c <= array.length; c++) {
                    for (let r = 1; r <= array[0].length; r++) {
                        fillContentsAndStyles(c, r, (d = -1))
                    }
                }
            }
        }

        // Iterate over each row (starting from the last row), and transpose all row references.
        if (dispRow !== 0) {
            // If the function is being run for the first time, initalise 'array'
            if (nonce === 0) {
                for (let rowNum = rng.e.r; rowNum >= startRow - 1; rowNum--) {
                    let row = []

                    for (let colNum = startCol - 1; colNum <= rng.e.c; colNum++) {
                        // Define a variable, cellOld, which represents the source cell to copy from.
                        let cellOld = sheet[XLSX.utils.encode_cell({ r: rowNum - dispRow, c: colNum })]

                        // Add row object to the column array with four cell attributes, column, row, type and value.
                        if (cellOld === undefined) {
                            row.push({ sheet: sheetName, col: colNum, row: rowNum, type: "undefined", value: "" })
                        } else if (cellOld.f) {
                            row.push({
                                sheet: sheetName,
                                col: colNum,
                                row: rowNum,
                                type: "formula",
                                value: shiftFormula(cellOld.f, 0, dispRow),
                            })
                        } else {
                            row.push({ sheet: sheetName, col: colNum, row: rowNum, type: "value", value: cellOld.v })
                        }
                    }
                    array.push(row)
                }
            } else {
                // If the function has been run before, take the 'array' variable that has been passed in and continue working on it.
                // Create a deep copy of the last row in the array (effectively the first row in the range as rows are stored
                // in reverse order), and advance each existing formula in the array by one column.
                const newRow = lodash.cloneDeep(array[array.length - 1])
                array.push(newRow)
                for (let rowNum = 0; rowNum < array.length - 1; rowNum++) {
                    array[rowNum].forEach((col) => {
                        col.row = col.row + 1
                        col.value = col.type === "formula" ? shiftFormula(col.value, 0, dispRow) : col.value
                    })
                }
            }

            // Iterate over each row (starting from the last row) and fill in the cell contents and style.
            const fillContentsAndStyles = (c, r, d) => {
                const styles = [
                    "bold",
                    "italic",
                    "underline",
                    "strikethrough",
                    "fontSize",
                    "fontFamily",
                    "fontColor",
                    "horizontalAlignment",
                    "verticalAlignment",
                    "wrapText",
                    "shrinkToFit",
                    "textDirection",
                    "textRotation",
                    "verticalText",
                    "fill",
                    "border",
                    "numberFormat",
                ]

                const cellNew = workbook
                    .sheet(sheetName)
                    .column(c + startCol - 1)
                    .cell(r + startRow - 1)
                const cellOld = workbook
                    .sheet(sheetName)
                    .column(c + startCol - 1)
                    .cell(r + startRow - 1 - d)

                // Copy array contents to spreadsheet.
                const contents = array[array.length - r][c - 1]

                if (contents.type === "undefined") {
                    cellNew.clear()
                } else if (contents.type === "formula") {
                    cellNew.formula(contents.value)
                } else {
                    cellNew.value(contents.value)
                }

                // Copy styles from old cell to new cell.
                const style = cellOld.style(styles)
                cellNew.style(style)

                // Insert an empty row after the last row in the range, to ensure the program runs correctly on the next iteration.
                if (r === array.length) {
                    workbook
                        .sheet(sheetName)
                        .column(c + startCol - 1)
                        .cell(array.length + startRow)
                        .value("")
                }
            }

            // Fill contents and styles in reverse order if dispRow === 1 (i.e. we are adding a row), and fill them in
            // ascending order if dispRow !== 1 (i.e. we are deleting a row). This helps to ensure the styles are correctly copied.
            if (dispRow == 1) {
                for (let r = array.length; r >= 1; r--) {
                    for (let c = 1; c <= array[0].length; c++) {
                        fillContentsAndStyles(c, r, (d = 1))
                    }
                }
            } else if (dispRow == -1) {
                for (let r = 1; r <= array.length; r++) {
                    for (let c = 1; c <= array[0].length; c++) {
                        fillContentsAndStyles(c, r, (d = -1))
                    }
                }
            }
        }
        return array
    }

    /*  EDIT EXCEL MODEL
        ------------------------------------------------------  */

    // Map years to dates for each of the specified variables
    const forecastPeriods = responses.forecastEnd - responses.forecastStart
    const periodNames = ["histStart", "histEnd", "forecastStart", "forecastEnd"]
    periodNames.forEach((name) => {
        let newDate = moment(responses["finYearEnd"]).toDate()
        newDate.setFullYear(Number(responses[name]))
        const startDate = new Date(1899, 11, 30)
        responses[name] = Math.abs((newDate - startDate) / 8.64e7)
    })

    // Reformat date variables
    const dateNames = ["valDate", "betaDate"]
    dateNames.forEach((name) => {
        responses[name] = moment(responses[name]).toDate()
    })

    // Convert variables from integers to decimals
    const percentNames = ["g", "rf", "erp", "preTaxRd", "debtRatio", "t"]
    percentNames.forEach((name) => {
        responses[name] = responses[name] === null ? responses[name] : Number(responses[name]) / 100
    })

    // Map convMode to 'H' or 'C' values
    responses.convMode = responses.convMode === "Historical" ? "H" : "C"

    // Create indexKey variable containing Capital IQ identifier for specified stock index
    const indexKey = {
        "MSCI World": "IQ379978898",
        "S&P 500": "IQ2668699",
        "FTSE 100": "IQ20923775",
        "MSCI Emerging Markets": "IQ20246097",
    }
    responses["indexId"] = indexKey[responses.index]

    console.log("Formatted inputs")

    // Populate Excel file
    XlsxPopulate.fromFileAsync(readFile)
        .then((workbook) => {
            // Populate sheet headers and model inputs
            const today = new Date().toJSON().slice(0, 10).replace(/-/g, "-")

            workbook.sheets().forEach((sheet) => {
                sheet.cell("B2").value("Valuation of " + responses.companyName)
                sheet.cell("B4").value("Date: " + today)
            })

            // Populate named ranges with assumptions
            const named_ranges_1 = [
                "ciqId",
                "curr",
                "restatementType",
                "filingMode",
                "convMode",
                "useCiqForecast",
                "g",
                "rf",
                "erp",
                "preTaxRd",
                "debtRatio",
                "t",
                "rOverride",
                "gearingMeasure",
                "index",
                "indexId",
            ]
            named_ranges_1.forEach((name) => {
                workbook.definedName(name).value(responses[name])
            })
            const named_ranges_2 = ["valDate", "betaDate", "histStart", "forecastStart"]
            named_ranges_2.forEach((name) => {
                workbook.definedName(name).value(responses[name]).style("numberFormat", "DD/MM/YYYY")
            })

            workbook.definedName("forecastDate").value(responses.valDate)

            console.log("Populated model assumptions")

            // Perform structural changes to model
            let dcfArray = []
            let forecastArray = []
            let ISArray = []
            let BSArray = []
            let CFSArray = []
            let betaArray = []
            let compsArray = []

            // Update 'DCF', 'Forecast', 'IS', 'BS' and 'CFS' sheets
            if (forecastPeriods > 3) {
                for (let i = 0; i < forecastPeriods - 3; i++) {
                    dcfArray = updateSheet(workbook, "DCF", 8, 22, (dispCol = 1), (dispRow = 0), i, dcfArray)
                    forecastArray = updateSheet(
                        workbook,
                        "Forecasts",
                        8,
                        1,
                        (dispCol = 1),
                        (dispRow = 0),
                        i,
                        forecastArray
                    )
                    ISArray = updateSheet(workbook, "IS", 8, 6, (dispCol = 1), (dispRow = 0), i, ISArray)
                    BSArray = updateSheet(workbook, "BS", 8, 6, (dispCol = 1), (dispRow = 0), i, BSArray)
                    CFSArray = updateSheet(workbook, "CFS", 8, 6, (dispCol = 1), (dispRow = 0), i, CFSArray)
                }
            } else if (forecastPeriods < 3) {
                updateSheet(workbook, "DCF", 7, 22, (dispCol = -1), (dispRow = 0), 0)
                updateSheet(workbook, "Forecasts", 7, 1, (dispCol = -1), (dispRow = 0), 0)
                updateSheet(workbook, "IS", 7, 6, (dispCol = -1), (dispRow = 0), i)
                updateSheet(workbook, "BS", 7, 6, (dispCol = -1), (dispRow = 0), i)
                updateSheet(workbook, "CFS", 7, 6, (dispCol = -1), (dispRow = 0), i)
            }

            console.log("Performed structural changes")

            for (let i = 0; i < responses.comps.length - 1; i++) {
                // Add rows for comps to 'Beta' sheet and update summary cells
                betaArray = updateSheet(workbook, "Beta", 1, 49, (dispCol = 0), (dispRow = 1), i, betaArray)
                const rows = [11, 12]
                rows.forEach((row) => {
                    const formula = workbook.sheet("Beta").column(3).cell(row).formula()
                    workbook.sheet("Beta").column(3).cell(row).formula(shiftFormula(formula, 0, 1))
                })
            }
            for (let i = 0; i < responses.comps.length - 1; i++) {
                // Add rows for comps to 'Comps' sheet and update summary cells
                compsArray = updateSheet(workbook, "Comps", 1, 37, (dispCol = 0), (dispRow = 1), i, compsArray)
                const formula = workbook.sheet("Comps").column(4).cell(22).formula()
                workbook.sheet("Comps").column(4).cell(22).formula(shiftFormula(formula, 0, 1))
            }

            // Fill in comps in 'Beta' and 'Comps' sheets
            for (let i = 0; i < responses.comps.length; i++) {
                workbook
                    .sheet("Beta")
                    .column(3)
                    .cell(48 + i)
                    .value(responses.comps[i].ciqId)
                workbook
                    .sheet("Comps")
                    .column(3)
                    .cell(36 + i)
                    .value(responses.comps[i].ciqId)
            }

            console.log("Added comparable companies")

            console.log("Saving workbook")
            return workbook.toFileAsync(writeFile).then(() => {
                response.download(writeFile, `${request.params.id}.xlsx`, (err) => {
                    if (err) {
                        response.status(500).send({
                            message: "Could not download the file. " + err,
                        })
                    }
                })
            })
        })
        .catch((error) => {
            console.log(error)
        })
}

module.exports = generateModel
