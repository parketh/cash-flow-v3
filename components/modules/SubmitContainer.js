import React, { useState } from "react"

import FormService from "~/services/FormService"

import Button from "@Elements/Button"
import ButtonReactive from "@Elements/ButtonReactive"

const SubmitContainer = ({ responses, setResponses, setSampleValues, clearForm, validateForm }) => {
    const [saveButtonStatus, setSaveButtonStatus] = useState(0)

    // Handle status of save button (to control whether a confirmation, alert or no notification is shown)
    const handleSaveStatus = (status) => {
        switch (status) {
            case 1:
                setSaveButtonStatus(1)
                setTimeout(() => {
                    setSaveButtonStatus(0)
                }, 1500)
                break
            case -1:
                setSaveButtonStatus(-1)
                setTimeout(() => {
                    setSaveButtonStatus(0)
                }, 1500)
                break
            default:
                setSaveButtonStatus(0)
        }
    }

    // Handles form submission by pushing responses to the server and updating save status
    const submitForm = (event) => {
        event.preventDefault()
        if (saveButtonStatus === 0) {
            if (validateForm()) {
                handleSaveStatus(1)
                FormService.updateForm(responses).then((returnedForm) => {
                    setResponses(returnedForm)
                })
            } else {
                handleSaveStatus(-1)
            }
        }
    }

    return (
        <div className="flex absolute bottom-0 bg-white h-32 md:h-20 w-screen bg-opacity-0 justify-center align-middle">
            <div className="flex flex-wrap backdrop-filter backdrop-blur-lg bg-opacity-30 border-t border-gray-200 justify-center align-middle py-3 w-screen h-full space-x-4">
                <Button
                    onClick={setSampleValues}
                    value="Use sample settings"
                    wrapperStyle="w-48 md:w-48 h-10 mt-2"
                    buttonStyle="h-full w-full rounded bg-white border-opacity-30 bg-opacity-0 font-semibold border-1 border-theme text-theme hover:bg-theme-lighter active:bg-theme-light text-center"
                />
                <Button
                    onClick={clearForm}
                    value="Clear settings"
                    wrapperStyle="w-48 md:w-48 h-10 mt-2"
                    buttonStyle="h-full w-full rounded font-semibold border-1 border-opacity-30	 border-accent text-accent hover:bg-accent-lighter active:bg-accent-light text-center"
                />
                <div className="inline">
                    <ButtonReactive onClick={submitForm} saveButtonStatus={saveButtonStatus} />
                </div>
                <div className="md:hidden"></div>
            </div>
        </div>
    )
}

export default SubmitContainer
