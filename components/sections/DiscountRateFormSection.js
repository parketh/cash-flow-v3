import SectionHeader from "@Elements/SectionHeader"
import Footnote from "@Elements/Footnote"

import DropDownFieldWithLabel from "@Modules/DropDownFieldWithLabel"
import IntSelectorField from "@Modules/IntSelectorField"

import DiscRateApproaches from "@FormOptions/DiscRateApproaches"

const DiscountRateFormSection = ({ responses, alerts, handleResponseChange }) => {
    return (
        <>
            <SectionHeader title="VALUATION ASSUMPTIONS" subtitle="Discount rate" />
            <div className="sectionHeader">
                <Footnote text="Note: You can update these assumptions later in the Excel model." />
                {
                    <DropDownFieldWithLabel
                        label="Discount rate calculation"
                        options={DiscRateApproaches}
                        id="discRateApproach"
                        response={responses.discRateApproach}
                        handleResponseChange={handleResponseChange}
                        showAlert={alerts.discRateApproach}
                    />
                }
                {
                    <IntSelectorField
                        label="Risk free rate (%)"
                        placeholder="2"
                        step="0.1"
                        min="0"
                        max="20"
                        id="rf"
                        response={responses.rf}
                        handleResponseChange={handleResponseChange}
                        showAlert={alerts.rf}
                    />
                }
                {
                    <IntSelectorField
                        label="Equity risk premium (%)"
                        placeholder="5.5"
                        step="0.1"
                        min="0"
                        max="20"
                        id="erp"
                        response={responses.erp}
                        handleResponseChange={handleResponseChange}
                        showAlert={alerts.erp}
                    />
                }
                {
                    <IntSelectorField
                        label="(Pre-tax) Cost of debt (%)"
                        placeholder="5"
                        step="0.1"
                        min="0"
                        max="50"
                        id="preTaxRd"
                        response={responses.preTaxRd}
                        handleResponseChange={handleResponseChange}
                        showAlert={alerts.preTaxRd}
                    />
                }
                {
                    <IntSelectorField
                        label="Debt ratio (%)"
                        placeholder="40"
                        step="0.1"
                        min="0"
                        max="100"
                        id="debtRatio"
                        response={responses.debtRatio}
                        handleResponseChange={handleResponseChange}
                        showAlert={alerts.debtRatio}
                    />
                }
                {
                    <IntSelectorField
                        label="Tax rate (%)"
                        placeholder="20"
                        step="0.1"
                        min="0"
                        max="100"
                        id="t"
                        response={responses.t}
                        handleResponseChange={handleResponseChange}
                        showAlert={alerts.t}
                    />
                }
                <Footnote
                    text="Note: Use the field below to manually enter a discount rate and override the inputs above."
                    showAlert={alerts.t}
                />
                {
                    <IntSelectorField
                        label="Discount rate (%) - override"
                        step="0.1"
                        min="0"
                        max="100"
                        id="rOverride"
                        response={responses.rOverride}
                        handleResponseChange={handleResponseChange}
                        showAlert={alerts.rOverride}
                    />
                }
            </div>
            <br />
        </>
    )
}

export default DiscountRateFormSection
