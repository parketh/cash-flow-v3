import moment from "moment"

import SectionHeader from "@Elements/SectionHeader"

import TextField from "@Modules/TextField"
import DateField from "@Modules/DateField"
import DropDownField from "@Modules/DropDownField"

import Currencies from "@FormOptions/Currencies"

const ConfigFormSection = ({ responses, alerts, handleResponseChange }) => {
    return (
        <>
            <SectionHeader title="CONFIGURATION" subtitle="Specify model inputs and assumptions" />
            <div className="sectionHeader">
                {
                    <TextField
                        label="Company Name"
                        placeholder="e.g. Apple Inc"
                        id="companyName"
                        response={responses.companyName}
                        handleResponseChange={handleResponseChange}
                        showAlert={alerts.companyName}
                    />
                }
                {
                    <TextField
                        label="Capital IQ identifier"
                        placeholder="e.g. IQ28754"
                        id="ciqId"
                        response={responses.ciqId}
                        handleResponseChange={handleResponseChange}
                        showAlert={alerts.ciqId}
                    />
                }
                {
                    <DateField
                        label="Valuation Date"
                        placeholder="2020-10-01"
                        min="1900-01-01"
                        max="2100-12-31"
                        id="valDate"
                        response={
                            responses.valDate ? moment(responses.valDate).format("YYYY-MM-DD") : responses.valDate
                        }
                        handleResponseChange={handleResponseChange}
                        showAlert={alerts.valDate}
                    />
                }
                {
                    <DropDownField
                        label="Currency"
                        options={Currencies}
                        id="curr"
                        response={responses.curr}
                        handleResponseChange={handleResponseChange}
                        showAlert={alerts.companyName}
                    />
                }
            </div>
            <br />
        </>
    )
}

export default ConfigFormSection
