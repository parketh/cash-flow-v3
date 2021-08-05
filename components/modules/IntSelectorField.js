import React, { Component } from "react"
import handleViewport from "react-in-viewport"
import FieldLabel from "@Elements/FieldLabel"
import Alert from "@Elements/Alert"

class IntSelectorField extends Component {
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
            <div className={this.getStyle()}>
                <div className="grid space-y-1">
                    <FieldLabel label={this.props.label} />
                    <input
                        className={this.props.showAlert ? "inputField border-1 border-accent" : "inputField"}
                        type="number"
                        min={this.props.min}
                        max={this.props.max}
                        step={this.props.step}
                        placeholder={this.props.placeholder}
                        id={this.props.id}
                        value={this.props.response || ""}
                        onChange={this.props.handleResponseChange}
                    />
                    <Alert showAlert={this.props.showAlert} label={this.props.label} />
                </div>
            </div>
        )
    }
}

const MySection = handleViewport(IntSelectorField, { rootMargin: "-1.0px" })

export default MySection
