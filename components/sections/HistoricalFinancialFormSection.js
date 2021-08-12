import moment from "moment"

import SectionHeader from "@Elements/SectionHeader"
import Footnote from "@Elements/Footnote"

import DateField from "@Modules/DateField"
import DropDownFieldWithLabel from "@Modules/DropDownFieldWithLabel"
import YearSelectorField from "@Modules/YearSelectorField"

import RestatementTypes from "@FormOptions/RestatementTypes"
import FilingModes from "@FormOptions/FilingModes"
import CurrConvModes from "@FormOptions/CurrConvModes"

const HistoricalFinancialFormSection = ({ responses, alerts, handleResponseChange }) => {
    return (
        <>
            <SectionHeader title="FINANCIAL DATA" subtitle="Historical" />
            <div className="sectionHeader">
                {
                    <DateField
                        label="Financial year end (DD/MM)"
                        placeholder="9999-12-31"
                        min="9999-01-01"
                        max="9999-12-31"
                        id="finYearEnd"
                        response={
                            responses.finYearEnd
                                ? moment(responses.finYearEnd).format("YYYY-MM-DD")
                                : responses.finYearEnd
                        }
                        handleResponseChange={handleResponseChange}
                        showAlert={alerts.finYearEnd}
                    />
                }
                {
                    <YearSelectorField
                        label="Historical period start (YYYY)"
                        placeholder="e.g. 2016"
                        step="1"
                        id="histStart"
                        response={responses.histStart}
                        handleResponseChange={handleResponseChange}
                        showAlert={alerts.histStart}
                    />
                }
                {
                    <YearSelectorField
                        label="Historical period end (YYYY)"
                        placeholder="e.g. 2018"
                        step="1"
                        id="histEnd"
                        response={responses.histEnd}
                        handleResponseChange={handleResponseChange}
                        showAlert={alerts.histEnd}
                    />
                }
                <Footnote text="Note: The following settings are used for downloading financial data from Capital IQ." />
                {
                    <DropDownFieldWithLabel
                        label="Restatement type"
                        options={RestatementTypes}
                        id="restatementType"
                        response={responses.restatementType}
                        handleResponseChange={handleResponseChange}
                        showAlert={alerts.restatementType}
                    />
                }
                {
                    <DropDownFieldWithLabel
                        label="Filing mode"
                        options={FilingModes}
                        id="filingMode"
                        response={responses.filingMode}
                        handleResponseChange={handleResponseChange}
                        showAlert={alerts.filingMode}
                    />
                }
                {
                    <DropDownFieldWithLabel
                        label="Currency conversion mode"
                        options={CurrConvModes}
                        id="convMode"
                        response={responses.convMode}
                        handleResponseChange={handleResponseChange}
                        showAlert={alerts.convMode}
                    />
                }
            </div>
            <br />
        </>
    )
}

export default HistoricalFinancialFormSection
