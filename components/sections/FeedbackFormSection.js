import React, { useState } from "react"
import lodash from "lodash"

import FormService from "~/services/FormService"

import Text from "@Elements/Text"
import SectionHeader from "@Elements/SectionHeader"
import Button from "@Elements/Button"
import TextArea from "@Modules/TextArea"
import TextField from "@Modules/TextField"

import EmptyFeedbackFormValues from "@FormValues/EmptyFeedbackFormValues"
import EmptyFeedbackFormAlerts from "@FormValues/EmptyFeedbackFormAlerts"

const FeedbackFormSection = () => {
    const [feedbackForm, setFeedbackForm] = useState(EmptyFeedbackFormValues)

    const [formCompleted, setFormCompleted] = useState(false)

    const [formAlerts, setFormAlerts] = useState(EmptyFeedbackFormAlerts)

    const handleFormChange = (event) => {
        setFeedbackForm({ ...feedbackForm, [event.target.id]: event.target.value })
    }

    const handleFormAlertsChange = () => {
        let returnValue = true
        let newFormAlerts = lodash.cloneDeep(formAlerts)

        Object.entries(feedbackForm).forEach(([key, value]) => {
            if (value === "" || value === null || value === undefined) {
                newFormAlerts[key] = true
                returnValue = false
            } else {
                newFormAlerts[key] = false
            }
        })
        setFormAlerts(newFormAlerts)
        return returnValue
    }

    const handleFormSubmit = (event) => {
        event.preventDefault()
        if (handleFormAlertsChange()) {
            FormService.submitFeedback(feedbackForm).then(() => setFormCompleted(true))
        }
    }

    if (formCompleted) {
        return (
            <div>
                <SectionHeader title="BEFORE YOU GO" subtitle="Please consider leaving some feedback!" />
                <div className="sectionHeader">
                    <Text>Thanks for taking the time to leave some feedback!</Text>
                </div>
            </div>
        )
    }

    return (
        <div>
            <SectionHeader title="BEFORE YOU GO" subtitle="Please consider leaving some feedback!" />
            <div className="sectionHeader">
                <Text>I'd love to know how you got on.</Text>
                <Text>
                    <span>
                        Please consider leaving some feedback, which will help me to continue improving the tool. You
                        can do so by filling out the form below.
                    </span>
                </Text>
                {
                    <TextField
                        label="Name"
                        placeholder="e.g. John Smith"
                        id="name"
                        response={feedbackForm.name}
                        handleResponseChange={handleFormChange}
                        showAlert={formAlerts.name}
                    />
                }
                {
                    <TextField
                        label="Email"
                        placeholder="e.g. john.smith@apple.com"
                        id="email"
                        response={feedbackForm.email}
                        handleResponseChange={handleFormChange}
                        showAlert={formAlerts.email}
                        type="email"
                    />
                }
                {
                    <TextArea
                        label="Message"
                        placeholder="Your message here"
                        id="message"
                        response={feedbackForm.message}
                        handleResponseChange={handleFormChange}
                        showAlert={formAlerts.message}
                    />
                }
                <Button
                    onClick={handleFormSubmit}
                    value="Submit"
                    wrapperStyle="w-20 h-8 text-sm mt-4"
                    buttonStyle="h-full w-full rounded font-bold bg-theme-lighter text-theme hover:bg-theme-light active:bg-theme-medium text-center"
                />
            </div>
        </div>
    )
}

export default FeedbackFormSection
