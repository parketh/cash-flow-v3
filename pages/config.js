import React, { useState, useEffect } from "react"
import { useUser } from "@auth0/nextjs-auth0"
import lodash from "lodash"

import FormService from "@Services/FormService"

// Import UI components
import ConfigFormSection from "@Sections/ConfigFormSection"
import HistoricalFinancialFormSection from "@Sections/HistoricalFinancialFormSection"
import ForecastFinancialFormSection from "@Sections/ForecastFinancialFormSection"
import DiscountRateFormSection from "@Sections/DiscountRateFormSection"
import BetaFormSection from "@Sections/BetaFormSection"
import CompsFormSection from "@Sections/CompsFormSection"
import SubmitContainer from "@Modules/SubmitContainer"
import DefaultLayout from "@Layouts/DefaultLayout"

// Import sample and empty values for alerts and forms
import EmptyFormAlerts from "@FormValues/EmptyFormAlerts"
import SampleFormValues from "@FormValues/SampleFormValues"
import EmptyFormValues from "@FormValues/EmptyFormValues"
import FormValueRanges from "@FormValues/FormValueRanges"

import range from "@Utils/range"

// import { Form } from "@Models/form"

const Configuration = ({ formId, setFormId }) => {
    const { user } = useUser()

    const [responses, setResponses] = useState([])
    const [alerts, setAlerts] = useState(EmptyFormAlerts)

    const timeSeriesValues = [
        "forecastRevGrowth",
        "forecastCogsPct",
        "forecastVarOpCostPct",
        "forecastFixedOpCost",
        "forecastDeprPct",
        "forecastCapexPct",
        "forecastWorkingCapPct",
    ]

    const generateEmptyAlerts = (currentResponse) => {
        let emptyAlerts = lodash.cloneDeep(currentResponse)
        emptyAlerts = lodash.mapValues(emptyAlerts, (value) => {
            if (typeof value === "object" && value !== null) {
                return lodash.mapValues(value, () => false)
            } else {
                return false
            }
        })
        return emptyAlerts
    }

    // Retrieve existing state of form from server on page load
    useEffect(() => {
        const initialiseForm = (initialResponses) => {
            setFormId(initialResponses.id)
            setResponses(initialResponses)
            setAlerts(generateEmptyAlerts(initialResponses))
        }

        FormService.retrieveUsers().then((existingUsers) => {
            if (existingUsers.map((u) => u.auth0UserId).includes(user.sub)) {
                const existingUser = existingUsers.filter((u) => u.auth0UserId === user.sub)[0]
                FormService.retrieveForm(existingUser.forms[0])
                    .then((initialResponses) => initialiseForm(initialResponses))
                    .then(() => {
                        // if () {
                        //     // TO DO - Set allow downloads to true
                        // } else {
                        //     // TO DO - Set allow downloads to false
                        // }
                    })
            } else {
                const newUser = {
                    auth0UserId: user.sub,
                    name: user.name,
                    email: user.email,
                    forms: [],
                    feedbacks: [],
                }
                FormService.createUser(newUser).then((returnedUser) => {
                    const newForm = { ...SampleFormValues, user: returnedUser.id }
                    FormService.createForm(newForm).then((initialResponses) => initialiseForm(initialResponses))
                })
            }
        })
    }, [])

    // Handle changes to form responses by updating state and cancelling active alerts
    const handleResponseChange = (event) => {
        const value = FormValueRanges[event.target.id]
            ? Math.min(
                  Math.max(event.target.value, FormValueRanges[event.target.id].min),
                  FormValueRanges[event.target.id].max
              )
            : event.target.value

        console.log(value)

        switch (event.target.id) {
            case "forecastStart":
            case "forecastEnd":
                const forecastStart =
                    event.target.id === "forecastStart"
                        ? Number(event.target.value)
                        : Number(responses["forecastStart"])
                const forecastEnd =
                    event.target.id === "forecastEnd" ? Number(event.target.value) : Number(responses["forecastEnd"])

                let deepCopy = lodash.cloneDeep(responses)

                timeSeriesValues.forEach((variable) => {
                    for (const [key, value] of Object.entries(deepCopy[variable])) {
                        if (Number(key) < forecastStart || Number(key) > forecastEnd) {
                            delete deepCopy[variable][key]
                        }
                    }
                    range(forecastStart, forecastEnd + 1).map((year) => {
                        if (!(year in responses[variable])) {
                            deepCopy[variable][year] = ""
                        }
                    })
                    setResponses({
                        ...deepCopy,
                        [event.target.id]: value,
                    })
                })
                break
            default:
                setResponses({
                    ...responses,
                    [event.target.id]: value,
                })
        }

        setAlerts({ ...alerts, [event.target.id]: false })
    }

    const handleResponseChangeNested = (event) => {
        setResponses({
            ...responses,
            [event.target.id]: {
                ...responses[event.target.id],
                [event.target.alt]: event.target.value,
            },
        })
        setAlerts({
            ...alerts,
            [event.target.id]: {
                ...alerts[event.target.id],
                [event.target.alt]: false,
            },
        })
    }

    // Overwrite form with sample values
    const setSampleValues = () => {
        if (window.confirm(`Overwrite current settings with sample settings? Any unsaved changes will be lost.`)) {
            setResponses(SampleFormValues)
            setAlerts(generateEmptyAlerts(responses))
        }
    }

    // Clear form values
    const clearForm = () => {
        if (window.confirm(`Clear settings? Any unsaved changes will be lost.`)) {
            setResponses(EmptyFormValues)
            setAlerts(generateEmptyAlerts(responses))
        }
    }

    // Validate form and store return value in isFormComplete state
    const validateForm = () => {
        let isValid = true
        let newAlerts = lodash.cloneDeep(alerts)

        Object.entries(responses).forEach(([key, value]) => {
            if (timeSeriesValues.includes(key)) {
                Object.entries(responses[key]).forEach(([yearKey, yearValue]) => {
                    if (yearValue === "" || yearValue === null || yearValue === undefined) {
                        newAlerts[key][yearKey] = true
                        isValid = false
                    } else {
                        newAlerts[key][yearKey] = false
                    }
                })
            } else if (key !== "comps" && key !== "rOverride" && key !== "rf" && key !== "preTaxRd" && key !== "erp") {
                if (
                    String(value).trim() === "" ||
                    String(value).trim() === null ||
                    String(value).trim() === undefined
                ) {
                    newAlerts[key] = true
                    isValid = false
                } else {
                    newAlerts[key] = false
                }
            } else if (
                responses["rOverride"] === "" ||
                responses["rOverride"] === null ||
                responses["rOverride"] === undefined
            ) {
                if (key === "rf" || key === "preTaxRd" || key === "erp") {
                    if (value === "" || value === null || value === undefined) {
                        newAlerts[key] = true
                        isValid = false
                    } else {
                        newAlerts[key] = false
                    }
                } else if (key === "comps") {
                    if (responses.comps.length > 0) {
                        newAlerts[key] = false
                    } else {
                        newAlerts[key] = true
                        isValid = false
                    }
                }
            } else {
                newAlerts[key] = false
            }
        })

        setAlerts(newAlerts)

        return isValid
    }

    return (
        <>
            <DefaultLayout>
                <form>
                    <ConfigFormSection
                        responses={responses}
                        alerts={alerts}
                        handleResponseChange={handleResponseChange}
                    />
                    <HistoricalFinancialFormSection
                        responses={responses}
                        alerts={alerts}
                        handleResponseChange={handleResponseChange}
                    />
                    <ForecastFinancialFormSection
                        responses={responses}
                        alerts={alerts}
                        handleResponseChange={handleResponseChange}
                        handleResponseChangeNested={handleResponseChangeNested}
                    />
                    <DiscountRateFormSection
                        responses={responses}
                        alerts={alerts}
                        handleResponseChange={handleResponseChange}
                    />
                    <BetaFormSection
                        responses={responses}
                        alerts={alerts}
                        handleResponseChange={handleResponseChange}
                    />
                    <CompsFormSection responses={responses} setResponses={setResponses} />
                    <div className="mt-16 h-16"></div>
                </form>
            </DefaultLayout>
            <SubmitContainer
                responses={responses}
                setResponses={setResponses}
                setSampleValues={setSampleValues}
                clearForm={clearForm}
                validateForm={validateForm}
                formId={formId}
            />
        </>
    )
}

export default Configuration
