import React, { useState, useEffect, useCallback } from 'react'
import moment from 'moment'
import lodash from 'lodash'

import FormService from "../services/FormService"

// Import React UI components
import TextField from "../components/TextField";
import TextFieldOptional from "../components/TextFieldOptional";
import DateField from "../components/DateField";
import FieldLabel from "../components/FieldLabel";
import SectionHeader from "../components/SectionHeader";
import IntSelectorField from "../components/IntSelectorField";
import DropDownFieldWithLabel from "../components/DropDownFieldWithLabel";
import DropDownField from "../components/DropDownField";
import Footnote from "../components/Footnote"
import ComparablesList from "../components/ComparablesList"
import Button from "../components/Button"
import ButtonShift from "../components/ButtonShift"

// Import choices for single-select inputs
import ForecastSources from "../data/ForecastSources"
import RestatementTypes from "../data/RestatementTypes"
import FilingModes from "../data/FilingModes"
import Currencies from "../data/Currencies"
import CurrConvModes from "../data/CurrConvModes"
import DiscRateApproaches from "../data/DiscRateApproaches"
import GearingMeasures from "../data/GearingMeasures"
import MarketIndices from "../data/MarketIndices"
import SampleValues from "../data/SampleValues"
import EmptyForm from "../data/EmptyForm"


const Configuration = () => {
    const [responses, setResponses] = useState([])
    const [saveStatus, setSaveStatus] = useState(0)
    const [alerts, setAlerts] = useState({
        "companyName": false,
        "ciqId": false,
        "valDate": false,
        "curr": false,
        "finYearEnd": false,
        "histStart": false,
        "histEnd": false,
        "restatementType": false,
        "filingMode": false,
        "convMode": false,
        "forecastModel": false,
        "useCiqForecast": false,
        "forecastStart": false,
        "forecastEnd": false,
        "g": false,
        "discRateApproach": false,
        "rf": false,
        "preTaxRd": false,
        "erp": false,
        "debtRatio": false,
        "t": false,
        "betaDate": false,
        "gearingMeasure": false,
        "index": false,
        "comps": false
    })

    // Retrieve existing state of the form
    useEffect(() => {
        FormService
          .retrieveForm()
          .then(initialResponses => {
            setResponses(initialResponses)
          }).then(() => {
            if (handleAlerts()) {
                // Set allow downloads to true
            } else {
                // Set allow downloads to false
            }
          })
    }, [])
    
    // Handles changes to the form responses
    const handleResponseChange = (event) => {
        setResponses({ ...responses, [event.target.id]: event.target.value })
        setAlerts({...alerts, [event.target.id]: false })
    }


    // Form validation
    const handleAlerts = useCallback(() => {
        let returnValue = true
        let newAlerts = lodash.cloneDeep(alerts)

        Object.entries(responses).forEach(([key, value]) => {
            if (key !== "comps" && 
                key !== "rOverride" &&
                key !== "rf" &&
                key !== "preTaxRd" &&
                key !== "erp") {
                if (value === "" || value === null || value === undefined) {
                    newAlerts[key] = true
                    returnValue = false
                } else {
                    newAlerts[key] = false
                }
            } else if (responses["rOverride"] === "" || 
            responses["rOverride"] === null || 
            responses["rOverride"] === undefined) {
                if (key === "rf" || key === "preTaxRd" || key === "erp") {
                    if (value === "" || value === null || value === undefined) {
                        newAlerts[key] = true
                        returnValue = false
                    } else {
                        newAlerts[key] = false
                    }
                } else if (key === 'comps') {
                    if (responses.comps.length > 0) {
                        newAlerts[key] = false
                    } else {
                        newAlerts[key] = true
                        returnValue = false
                    }
                }
            } else {
                newAlerts[key] = false
            }
        })
        setAlerts(newAlerts)
        return returnValue
    }, [])

    const handleSaveStatus = (status) => {
        switch(status) {
            case 1:
                setSaveStatus(1)
                setTimeout(() => {setSaveStatus(0)}, 1500)
                break
            case -1:
                setSaveStatus(-1)
                setTimeout(() => {setSaveStatus(0)}, 1500)
                break
            default:
                setSaveStatus(0)
        }
    }

    // Handles form submission by pushing responses to the server
    const submitForm = (event) => {
        event.preventDefault()
        if (handleAlerts()) {
            handleSaveStatus(1)
            FormService
            .updateForm(responses)
            .then(returnedForm => {
                setResponses(returnedForm)
            })
        } else {
            handleSaveStatus(-1)
        }
    }

    const setSampleValues = () => {
        if (window.confirm(`Overwrite current settings with sample settings? Any unsaved changes will be lost.`)) {
            setResponses(SampleValues)
            setAlerts(Object.fromEntries(Object.keys(alerts).map((key) => [key, false])))
        }
    }

    const clearForm = () => {
        if (window.confirm(`Clear settings? Any unsaved changes will be lost.`)) {
            setResponses(EmptyForm)
            setAlerts(Object.fromEntries(Object.keys(alerts).map((key) => [key, false])))
        }
    }

    return (
        <div className="overflow-y-auto scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-50 scrollbar-w-2 scrollbar-thumb-rounded-full select-none">
            <div className="h-auto w-full px-5 py-5 space-y-2 flex justify-center">
                <div className="w-768">
                    <form>
                        {<SectionHeader title="CONFIGURATION" subtitle="Specify model inputs and assumptions"/>}
                        <div className="sectionHeader">
                            {<TextField label="Company Name" placeholder="e.g. Apple Inc" id="companyName" response={responses.companyName} handleResponseChange={handleResponseChange} showAlert={alerts.companyName} />}
                            {<TextField label="Capital IQ identifier" placeholder="e.g. IQ28754" id="ciqId" response={responses.ciqId} handleResponseChange={handleResponseChange} showAlert={alerts.ciqId} />}
                            {<DateField label="Valuation Date" placeholder="2020-10-01" min="1900-01-01" max="2100-12-31" id="valDate" response={responses.valDate ? moment(responses.valDate).format('YYYY-MM-DD') : responses.valDate} handleResponseChange={handleResponseChange} showAlert={alerts.valDate} />}
                            {<DropDownField label="Currency" options={Currencies} id="curr" response={responses.curr} handleResponseChange={handleResponseChange} showAlert={alerts.companyName}/>}
                        </div>
                        <br />

                        {<SectionHeader title="FINANCIAL DATA" subtitle="Historical" />}
                        <div className="sectionHeader">
                            {<DateField label="Financial year end (DD/MM)" placeholder="9999-12-31" min="9999-01-01" max="9999-12-31" id="finYearEnd" response={responses.finYearEnd ? moment(responses.finYearEnd).format('YYYY-MM-DD') : responses.finYearEnd} handleResponseChange={handleResponseChange} showAlert={alerts.finYearEnd} />}
                            {<IntSelectorField label="Historical period start (YYYY)" placeholder="e.g. 2016" step="1" min="2000" max="2021" id="histStart" response={responses.histStart} handleResponseChange={handleResponseChange} showAlert={alerts.histStart} />}
                            {<IntSelectorField label="Historical period end (YYYY)" placeholder="e.g. 2018" step="1" min="2000" max="2021" id="histEnd" response={responses.histEnd} handleResponseChange={handleResponseChange} showAlert={alerts.histEnd} />}
                            <Footnote text="Note: The following settings are used for downloading financial data from Capital IQ." />
                            {<DropDownFieldWithLabel label="Restatement type" options={RestatementTypes} id="restatementType" response={responses.restatementType} handleResponseChange={handleResponseChange} showAlert={alerts.restatementType} />}
                            {<DropDownFieldWithLabel label="Filing mode" options={FilingModes} id="filingMode" response={responses.filingMode} handleResponseChange={handleResponseChange} showAlert={alerts.filingMode} />}
                            {<DropDownFieldWithLabel label="Currency conversion mode" options={CurrConvModes} id="convMode" response={responses.convMode} handleResponseChange={handleResponseChange} showAlert={alerts.convMode} />}
                        </div>                                
                        <br />

                        {<SectionHeader title="FINANCIAL DATA" subtitle="Forecast" />}
                        <div className="sectionHeader">
                            {<DropDownField label="Source of forecasts" options={ForecastSources} id="useCiqForecast" response={responses.useCiqForecast} handleResponseChange={handleResponseChange} showAlert={alerts.useCiqForecast} />}
                            {<IntSelectorField label="Forecast period start (YYYY)" placeholder="e.g. 2018" step="1" min="2000" max="2021" id="forecastStart" response={responses.forecastStart} handleResponseChange={handleResponseChange} showAlert={alerts.forecastStart} />}
                            {<IntSelectorField label="Forecast period end (YYYY)" placeholder="e.g. 2021" step="1" min="2000" max="2100" id="forecastEnd" response={responses.forecastEnd} handleResponseChange={handleResponseChange} showAlert={alerts.forecastEnd} />}
                            {<IntSelectorField label="Terminal growth rate (%)" placeholder="2" step="0.01" min="0.1" max="10" id="g" response={responses.g} handleResponseChange={handleResponseChange} showAlert={alerts.g} />}
                        </div>
                        <br />

                        {<SectionHeader title="VALUATION ASSUMPTIONS" subtitle="Discount rate" />}
                        <div className="sectionHeader">
                            <Footnote text="Note: You can update these assumptions later in the Excel model." />  
                            {<DropDownFieldWithLabel label="Discount rate calculation" options={DiscRateApproaches} id="discRateApproach" response={responses.discRateApproach} handleResponseChange={handleResponseChange} showAlert={alerts.discRateApproach} />}
                            {<IntSelectorField label="Risk free rate (%)" placeholder="2" step="0.1" min="0" max="20" id="rf" response={responses.rf} handleResponseChange={handleResponseChange} showAlert={alerts.rf} />}
                            {<IntSelectorField label="Equity risk premium (%)" placeholder="5.5" step="0.1" min="0" max="20" id="erp" response={responses.erp} handleResponseChange={handleResponseChange} showAlert={alerts.erp} />}
                            {<IntSelectorField label="(Pre-tax) Cost of debt (%)" placeholder="5" step="0.1" min="0" max="50" id="preTaxRd" response={responses.preTaxRd} handleResponseChange={handleResponseChange} showAlert={alerts.preTaxRd} />}
                            {<IntSelectorField label="Debt ratio (%)" placeholder="40" step="0.1" min="0" max="100" id="debtRatio" response={responses.debtRatio} handleResponseChange={handleResponseChange} showAlert={alerts.debtRatio} />}
                            {<IntSelectorField label="Tax rate (%)" placeholder="20" step="0.1" min="0" max="100" id="t" response={responses.t} handleResponseChange={handleResponseChange} showAlert={alerts.t} />}
                            <Footnote text="Note: Use the field below to manually enter a discount rate and override the inputs above." showAlert={alerts.t} />
                            {<IntSelectorField label="Discount rate (%) - override" step="0.1" min="0" max="100" id="rOverride" response={responses.rOverride} handleResponseChange={handleResponseChange} showAlert={alerts.rOverride}/>}
                        </div>
                        <br />

                        {<SectionHeader title="VALUATION ASSUMPTIONS" subtitle="Beta" />}
                        <div className="sectionHeader">
                            {<DateField label="Date for assessing beta" placeholder="2020-10-01" min="1900-01-01" max="2100-12-31" id="betaDate" response={responses.betaDate ? moment(responses.betaDate).format('YYYY-MM-DD') : responses.betaDate} handleResponseChange={handleResponseChange} showAlert={alerts.betaDate} />}
                            {<DropDownFieldWithLabel label="Measure of gearing" options={GearingMeasures} id="gearingMeasure" response={responses.gearingMeasure} handleResponseChange={handleResponseChange} showAlert={alerts.gearingMeasure} />}
                            {<DropDownField label="Index" options={MarketIndices} id="index" response={responses.index} handleResponseChange={handleResponseChange} showAlert={alerts.index} />}
                        </div>
                        <br />

                        {<SectionHeader title="VALUATION ASSUMPTIONS" subtitle="Comparable companies" />}
                        <div className="sectionHeader">
                            <Footnote text="Note: These comparable companies are used to estimate the beta of the subject company." />
                            <Comparables responses={responses} setResponses={setResponses} />
                        </div>
                        <div className="mt-16 h-16"></div>
                        
                    </form>
                </div>
            </div>
            <Submit submitForm={submitForm} setSampleValues={setSampleValues} clearForm={clearForm} saveStatus={saveStatus} />
        </div>
    );
}

const Submit = ({ submitForm, setSampleValues, clearForm , saveStatus }) => {
    return (
        <div className="flex absolute bottom-0 bg-white h-32 md:h-20 w-screen bg-opacity-0 justify-center align-middle">
            <div className="flex flex-wrap backdrop-filter backdrop-blur-lg bg-opacity-30 border-t border-gray-200 justify-center align-middle py-3 w-screen h-full space-x-4">
                <Button onClick={setSampleValues} value="Use sample settings" styles1="w-48 md:w-48 h-10 mt-2" styles2="h-full w-full rounded bg-white border-opacity-30 bg-opacity-0 font-semibold border-1 border-theme text-theme hover:bg-theme-lighter active:bg-theme-light text-center"/>
                <Button onClick={clearForm} value="Clear settings" styles1="w-48 md:w-48 h-10 mt-2" styles2="h-full w-full rounded font-semibold border-1 border-opacity-30	 border-accent text-accent hover:bg-accent-lighter active:bg-accent-light text-center"/>
                <div className="inline">
                    <ButtonShift onClick={submitForm} value="Save settings" saveStatus={saveStatus} />
                </div>
                <div className="md:hidden"></div>
            </div>
        </div>
    )
}

const Comparables = ({ responses, setResponses }) => {
    const [newComp, setNewComp] = useState('')
    const [newCompCiq, setNewCompCiq] = useState('')
    const [showConfirm, setShowConfirm] = useState(false)
    const [alerts, setAlerts] = useState({
        "addCompany": false,
        "addCiqTicker": false
    })
    
    const handleNewCompChange = (event) => {
        setNewComp(event.target.value)
        setAlerts({...alerts, [event.target.id]: false })
    }

    const handleNewCompCiqChange = (event) => {
        setNewCompCiq(event.target.value)
        setAlerts({...alerts, [event.target.id]: false })
    }

    const handleShowConfirm = () => {
        if (!showConfirm) {
            setShowConfirm(true)
            setTimeout(() => {
                setShowConfirm(false)
            }, 3000)
        } else {
            setShowConfirm(false)
        }
    }

    const handleAlerts = () => {
        let returnValue = true
        let newAlerts = JSON.parse(JSON.stringify(alerts))
        if (newComp === "" || newComp === null) {
            newAlerts.addCompany = true
            returnValue = false
        } else {
            newAlerts.addCompany = false
        }
        if (newCompCiq === "" || newCompCiq === null) {
            newAlerts.addCiqTicker = true
            returnValue = false
        } else {
            newAlerts.addCiqTicker = false
        }
        setAlerts(newAlerts)

        return returnValue
    }

    const addOrUpdateComp = (event) => {
        event.preventDefault()
        if (handleAlerts()) {
            const newEntry = {name: newComp, ciqId: newCompCiq}
            if (responses.comps.filter(comp => comp.name === newComp).length > 0) {
                if (window.confirm(`${newComp} already exists. Update with new Capital IQ ticker?`)) {
                    FormService
                        .updateCompany(responses.comps.filter(comp => comp.name === newComp)[0].id, newEntry)
                        .then(returnedComps => setResponses({...responses, comps: returnedComps}))
                        handleShowConfirm()
                }
            } else {
                FormService
                    .createCompany(newEntry)
                    .then(returnedComps => setResponses({...responses, comps: returnedComps}))
                setNewComp('')
                setNewCompCiq('')
                handleShowConfirm()
            }
        }
    }

    const removeComp = (event) => {
        event.preventDefault()
        const compToDelete = responses.comps.filter(comp => comp.id === event.target.id)[0]
        if (window.confirm(`Delete ${compToDelete.name} ?`)) {
            FormService
                .removeCompany(event.target.id)
            setResponses({...responses, comps: responses.comps.filter(comp => comp.id !== event.target.id)})
            setNewComp('')
            setNewCompCiq('')
        }
    }
    
    return (
        <div className="divide-y-2">
            <div className="mb-4 flex flex-col space-y-3 md:flex-row md:space-y-0 md:space-x-3">
                <div className="align-middle">
                    <FieldLabel label="Add company" />
                </div>
                <TextFieldOptional value={newComp} placeholder="Company name" onChange={handleNewCompChange} showAlert={alerts.addCompany} id="addCompany" />
                <TextFieldOptional value={newCompCiq} placeholder="Stock ticker / CIQ ticker" onChange={handleNewCompCiqChange} showAlert={alerts.addCiqTicker} id="addCiqTicker" />
                <div className="flex flex-row align-middle space-x-3">
                    <Button onClick={addOrUpdateComp} value="Add" styles1="w-20 h-8 text-sm" styles2="h-full w-full rounded font-bold bg-theme-lighter text-theme hover:bg-theme-light active:bg-theme-medium text-center" />
                    <Confirmation showConfirm={showConfirm} handleShowConfirm={handleShowConfirm} />
                </div>
            </div>
            
            <ComparablesList comps={responses.comps} removeComp={removeComp} />   
        </div>
    )
}

const Confirmation = ({ showConfirm, handleShowConfirm }) => {
    if (showConfirm) {
        return (
            <div className="align-middle" >
                <img className="w-5 mt-1" src="/images/check.png" onClick={handleShowConfirm} alt="check" width={20} height={20} />
            </div>
        )
    } else {
        return (
            <div></div>
        )
    }
}

export default Configuration
