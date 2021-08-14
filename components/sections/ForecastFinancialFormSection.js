import SectionHeader from "@Elements/SectionHeader"
import Footnote from "@Elements/Footnote"

import DropDownField from "@Modules/DropDownField"
import YearSelectorField from "@Modules/YearSelectorField"
import PercentageSelectorField from "@Modules/PercentageSelectorField"
import TimeSeriesField from "@Modules/TimeSeriesField"
import ForecastSources from "@FormOptions/ForecastSources"

const ForecastFinancialFormSection = ({ responses, alerts, handleResponseChange, handleResponseChangeNested }) => {
    return (
        <>
            {<SectionHeader title="FINANCIAL DATA" subtitle="Forecast" />}
            <div className="sectionHeader">
                {
                    <DropDownField
                        label="Use Capital IQ forecasts where available"
                        options={ForecastSources}
                        id="useCiqForecast"
                        response={responses.useCiqForecast}
                        handleResponseChange={handleResponseChange}
                        showAlert={alerts.useCiqForecast}
                    />
                }
                <Footnote
                    text="Caution: Changing the forecast period will update all of the forecasting assumptions and may cause loss of unsaved data. Please use the arrows to change the forecast start and end years."
                    color="text-red-500"
                />
                {
                    <YearSelectorField
                        label="Forecast period start (YYYY)"
                        placeholder="e.g. 2018"
                        step="1"
                        id="forecastStart"
                        response={responses.forecastStart}
                        handleResponseChange={handleResponseChange}
                        showAlert={alerts.forecastStart}
                    />
                }
                {
                    <YearSelectorField
                        label="Forecast period end (YYYY)"
                        placeholder="e.g. 2021"
                        step="1"
                        id="forecastEnd"
                        response={responses.forecastEnd}
                        handleResponseChange={handleResponseChange}
                        showAlert={alerts.forecastEnd}
                    />
                }
                <TimeSeriesField
                    label="Revenue growth rate (%)"
                    start={responses.forecastStart}
                    end={responses.forecastEnd}
                    placeholder="0"
                    step="1"
                    id="forecastRevGrowth"
                    unit="%"
                    response={responses.forecastRevGrowth}
                    handleResponseChangeNested={handleResponseChangeNested}
                    showAlert={alerts.forecastRevGrowth}
                />
                <TimeSeriesField
                    label="Cost of goods sold (% of revenues)"
                    start={responses.forecastStart}
                    end={responses.forecastEnd}
                    placeholder="0"
                    step="1"
                    id="forecastCogsPct"
                    unit="%"
                    response={responses.forecastCogsPct}
                    handleResponseChangeNested={handleResponseChangeNested}
                    showAlert={alerts.forecastCogsPct}
                />
                <TimeSeriesField
                    label="Variable operating costs (% of revenues)"
                    start={responses.forecastStart}
                    end={responses.forecastEnd}
                    placeholder="0"
                    step="1"
                    id="forecastVarOpCostPct"
                    unit="%"
                    response={responses.forecastVarOpCostPct}
                    handleResponseChangeNested={handleResponseChangeNested}
                    showAlert={alerts.forecastVarOpCostPct}
                />
                <TimeSeriesField
                    label={"Fixed operating costs (" + responses.curr + " million)"}
                    start={responses.forecastStart}
                    end={responses.forecastEnd}
                    placeholder="0"
                    step="1"
                    id="forecastFixedOpCost"
                    response={responses.forecastFixedOpCost}
                    handleResponseChangeNested={handleResponseChangeNested}
                    showAlert={alerts.forecastFixedOpCost}
                />
                <TimeSeriesField
                    label={"Depreciation (% of revenues)"}
                    start={responses.forecastStart}
                    end={responses.forecastEnd}
                    placeholder="0"
                    step="1"
                    id="forecastDeprPct"
                    response={responses.forecastDeprPct}
                    handleResponseChangeNested={handleResponseChangeNested}
                    unit="%"
                    showAlert={alerts.forecastDeprPct}
                />
                <TimeSeriesField
                    label={"Capex (% of revenues)"}
                    start={responses.forecastStart}
                    end={responses.forecastEnd}
                    placeholder="0"
                    step="1"
                    id="forecastCapexPct"
                    unit="%"
                    response={responses.forecastCapexPct}
                    handleResponseChangeNested={handleResponseChangeNested}
                    showAlert={alerts.forecastCapexPct}
                />
                <TimeSeriesField
                    label={"Working capital (% of revenues)"}
                    start={responses.forecastStart}
                    end={responses.forecastEnd}
                    placeholder="0"
                    step="1"
                    id="forecastWorkingCapPct"
                    unit="%"
                    response={responses.forecastWorkingCapPct}
                    handleResponseChangeNested={handleResponseChangeNested}
                    showAlert={alerts.forecastWorkingCapPct}
                />
                {
                    <PercentageSelectorField
                        label="Terminal growth rate (%)"
                        placeholder="2"
                        step="0.01"
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
