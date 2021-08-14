import React, { Component } from "react"
import handleViewport from "react-in-viewport"
import FieldLabel from "@Elements/FieldLabel"
import Alert from "@Elements/Alert"

class PercentageSelectorField extends Component {
    getStyle() {
        const { inViewport, enterCount } = this.props
        if (inViewport && enterCount === 1) {
            return "animate-fadeIn"
        } else {
            return ""
        }
    }

    render() {
        return (
            <div className={"grid space-y-1 " + this.getStyle()}>
                <FieldLabel label={this.props.label} />
                <div className="relative">
                    <input
                        className={
                            "inputField w-full percentValue " + (this.props.showAlert ? "border-1 border-accent" : "")
                        }
                        type="number"
                        step={this.props.step}
                        placeholder={this.props.placeholder}
                        id={this.props.id}
                        value={this.props.response || ""}
                        onChange={this.props.handleResponseChange}
                    />
                    <span className="absolute right-2 mt-1 text-gray-500">%</span>
                </div>
                <Alert showAlert={this.props.showAlert} label={this.props.label} />
            </div>
        )
    }
}

const MySection = handleViewport(PercentageSelectorField, { rootMargin: "-1.0px" })

export default MySection
