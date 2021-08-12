const currYear = Number(new Date().getFullYear())

const FormValueRanges = {
    histStart: {
        min: currYear - 30,
        max: currYear,
    },
    histEnd: {
        min: currYear - 30,
        max: currYear,
    },
    forecastStart: {
        min: currYear - 30,
        max: currYear + 30,
    },
    forecastEnd: {
        min: currYear - 30,
        max: currYear + 30,
    },
    forecastRevGrowth: {
        min: -1000,
        max: 1000,
    },
    g: {
        min: -1000,
        max: 1000,
    },
    rf: {
        min: 0,
        max: 100,
    },
    preTaxRd: {
        min: 0,
        max: 100,
    },
    debtRatio: {
        min: 0,
        max: 100,
    },
    t: {
        min: 0,
        max: 100,
    },
    erp: {
        min: 0,
        max: 100,
    },
}

export default FormValueRanges
