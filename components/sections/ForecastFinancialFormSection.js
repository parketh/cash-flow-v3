import SectionHeader from "@Elements/SectionHeader"

import DropDownField from "@Modules/DropDownField"
import IntSelectorField from "@Modules/IntSelectorField"

import ForecastSources from "@FormOptions/ForecastSources"

const ForecastFinancialFormSection = ({ responses, alerts, handleResponseChange }) => {
    return (
        <>
            {<SectionHeader title="FINANCIAL DATA" subtitle="Forecast" />}
            <div className="sectionHeader">
                {
                    <DropDownField
                        label="Source of forecasts"
                        options={ForecastSources}
                        id="useCiqForecast"
                        response={responses.useCiqForecast}
                        handleResponseChange={handleResponseChange}
                        showAlert={alerts.useCiqForecast}
                    />
                }
                {
                    <IntSelectorField
                        label="Forecast period start (YYYY)"
                        placeholder="e.g. 2018"
                        step="1"
                        min="2000"
                        max="2021"
                        id="forecastStart"
                        response={responses.forecastStart}
                        handleResponseChange={handleResponseChange}
                        showAlert={alerts.forecastStart}
                    />
                }
                {
                    <IntSelectorField
                        label="Forecast period end (YYYY)"
                        placeholder="e.g. 2021"
                        step="1"
                        min="2000"
                        max="2100"
                        id="forecastEnd"
                        response={responses.forecastEnd}
                        handleResponseChange={handleResponseChange}
                        showAlert={alerts.forecastEnd}
                    />
                }
                {
                    <IntSelectorField
                        label="Terminal growth rate (%)"
                        placeholder="2"
                        step="0.01"
                        min="0.1"
                        max="10"
                        id="g"
                        response={responses.g}
                        handleResponseChange={handleResponseChange}
                        showAlert={alerts.g}
                    />
                }
            </div>
            <br />
        </>
    )
}

export default ForecastFinancialFormSection
