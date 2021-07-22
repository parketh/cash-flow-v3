import React, { useState } from 'react'
import lodash from 'lodash'

import FormService from "../services/FormService"

// Import React UI components
import TextField from "../components/TextField"
import TextArea from "../components/TextArea";
import SectionHeader from "../components/SectionHeader"
import Button from "../components/Button"

const Download = () => {
    const [feedbackForm, setFeedbackForm] = useState({
        "name": "",
        "email": "",
        "message": ""
    })

    const [formCompleted, setFormCompleted] = useState(false)
    const [showDLLoader, setShowDLLoader] = useState(false)

    const [formAlerts, setFormAlerts] = useState({
        "name": false,
        "email": false,
        "message": false
    })

    const handleFormChange = (event) => {
        setFeedbackForm({...feedbackForm, [event.target.id]: event.target.value})
    }

    const handleFormAlertsChange = () => {
        console.log("handleFormAlertsChange")
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
            FormService
                .submitFeedback(feedbackForm)
                .then(() => setFormCompleted(true))
        }
    }
    
    const handleDownloadFile = () => {
        setShowDLLoader(true)
        FormService
            .downloadFile()
            .then(() => setShowDLLoader(false))
    }

    const allowDL = true // temporary controller

    if (allowDL) {
        return (
            <div className="overflow-y-auto scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-50 scrollbar-w-2 scrollbar-thumb-rounded-full select-none font-sans">
                <div className="h-auto w-full px-5 py-5 space-y-2 flex justify-center">
                    <div className="w-768">
                        {<SectionHeader title="DOWNLOAD" subtitle="Download your valuation model"/>}
                        <div className="sectionHeader mb-24">
                            <div className="mb-8 font-medium text-gray-500">Success! Download your model below.</div>
                            <Button onClick={handleDownloadFile} value="Download" styles1="w-20 h-8 text-sm" styles2="h-full w-full rounded font-bold bg-theme-lighter text-theme hover:bg-theme-light active:bg-theme-medium text-center" />
                            <DownloadLoader showDLLoader={showDLLoader}/>
                        </div>
                        <FeedbackForm feedbackForm={feedbackForm} handleFormChange={handleFormChange} formAlerts={formAlerts} handleFormSubmit={handleFormSubmit} formCompleted={formCompleted} />
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="overflow-y-auto scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-50 scrollbar-w-2 scrollbar-thumb-rounded-full">
                <div className="h-auto w-full px-5 py-5 space-y-2 flex justify-center">
                    <div className="w-768">
                        {<SectionHeader title="DOWNLOAD" subtitle="Download your valuation model"/>}
                        <div className="sectionHeader">
                            <div className="font-medium text-gray-500">
                                <span>Whoops! It looks like you either haven't finished configuring your model, or you've just refreshed your page. Please return to the</span>
                                <img src="/images/settings.png" className="mx-2 pb-1 w-4 h-4 inline" alt="settings" />
                                <span>Configuration page to continue.</span></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }  
}

const DownloadLoader = ({ showDLLoader }) => {
    if (showDLLoader) {
        return (
            <div className="space-x-3 text-sm pt-4">
                <img className="animate-spin inline w-4 h-4" src="/images/loading.png" alt="loading" />
                <span className="inline font-semibold text-gray-500">Generating your file</span>
            </div>
        )
    } else {
        return (
            <div></div>
        )
    }
}

const FeedbackForm = ({ feedbackForm, handleFormChange, formAlerts, handleFormSubmit, formCompleted }) => {
    if (formCompleted) {
        return (
            <div>
                <SectionHeader title="BEFORE YOU GO" subtitle="Please consider leaving some feedback!" />
                <div className="sectionHeader">
                    <div className="mb-8 font-medium text-gray-500">Thanks for taking the time to leave some feedback!</div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <SectionHeader title="BEFORE YOU GO" subtitle="Please consider leaving some feedback!" />
            <div className="sectionHeader">
                <div className="mb-8 font-medium text-gray-500">I'd love to know how you got on.</div>
                <div className="mb-8 font-medium text-gray-500">Please consider leaving some feedback, which will help me to continue improving the tool. You can do so by sending me an email at <span><a className="text-theme" href="mailto:yeungparkhay@gmail.com">yeungparkhay@gmail.com</a></span>, or via the form below.</div>
                {<TextField label="Name" placeholder="e.g. John Smith" id="name" response={feedbackForm.name} handleResponseChange={handleFormChange} showAlert={formAlerts.name} />}
                {<TextField label="Email" placeholder="e.g. john.smith@apple.com" id="email" response={feedbackForm.email} handleResponseChange={handleFormChange} showAlert={formAlerts.email} type="email" />}
                {<TextArea label="Message" placeholder="Your message here" id="message" response={feedbackForm.message} handleResponseChange={handleFormChange} showAlert={formAlerts.message} />}
                <Button onClick={handleFormSubmit} value="Submit" styles1="w-20 h-8 text-sm mt-4" styles2="h-full w-full rounded font-bold bg-theme-lighter text-theme hover:bg-theme-light active:bg-theme-medium text-center" />
            </div>
        </div>
    )
}

export default Download