import moment from "moment"

import SectionHeader from "@Elements/SectionHeader"

import DateField from "@Modules/DateField"
import DropDownField from "@Modules/DropDownField"
import DropDownFieldWithLabel from "@Modules/DropDownFieldWithLabel"

import GearingMeasures from "@FormOptions/GearingMeasures"
import MarketIndices from "@FormOptions/MarketIndices"

const BetaFormSection = ({ responses, alerts, handleResponseChange }) => {
    return (
        <>
            {<SectionHeader title="VALUATION ASSUMPTIONS" subtitle="Beta" />}
            <div className="sectionHeader">
                {
                    <DateField
                        label="Date for assessing beta"
                        placeholder="2020-10-01"
                        min="1900-01-01"
                        max="2100-12-31"
                        id="betaDate"
                        response={
                            responses.betaDate ? moment(responses.betaDate).format("YYYY-MM-DD") : responses.betaDate
                        }
                        handleResponseChange={handleResponseChange}
                        showAlert={alerts.betaDate}
                    />
                }
                {
                    <DropDownFieldWithLabel
                        label="Measure of gearing"
                        options={GearingMeasures}
                        id="gearingMeasure"
                        response={responses.gearingMeasure}
                        handleResponseChange={handleResponseChange}
                        showAlert={alerts.gearingMeasure}
                    />
                }
                {
                    <DropDownField
                        label="Index"
                        options={MarketIndices}
                        id="index"
                        response={responses.index}
                        handleResponseChange={handleResponseChange}
                        showAlert={alerts.index}
                    />
                }
            </div>
            <br />
        </>
    )
}

export default BetaFormSection
