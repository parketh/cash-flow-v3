import React, { Component } from "react"
import handleViewport from "react-in-viewport"

import Button from "@Elements/Button"

class ButtonReactive extends Component {
    getStyle() {
        const { inViewport, enterCount } = this.props
        if (inViewport && enterCount === 1) {
            return "animate-fadeIn"
        } else {
            return ""
        }
    }

    render() {
        const wrapperStyle = "w-400 md:w-80 h-10 mt-2"
        let buttonStyle, value
        if (this.props.saveButtonStatus === 1) {
            buttonStyle = "h-full w-full rounded bg-green-700 font-bold text-white text-center"
            value = "Success!"
        } else if (this.props.saveButtonStatus === -1) {
            buttonStyle = "h-full w-full rounded bg-accent-dark font-bold text-white"
            value = "Missing fields"
        } else {
            buttonStyle =
                "h-full w-full rounded font-bold text-white bg-theme hover:bg-theme-medium active:bg-theme-dark text-center"
            value = "Save settings"
        }

        return (
            <Button wrapperStyle={wrapperStyle} buttonStyle={buttonStyle} onClick={this.props.onClick} value={value} />
        )
    }
}

const ButtonReactiveWrapped = handleViewport(ButtonReactive, { rootMargin: "-1.0px" })

export default ButtonReactiveWrapped
