import React, { Component } from "react"
import handleViewport from "react-in-viewport"
import FieldLabel from "@Elements/FieldLabel"
import Alert from "@Elements/Alert"

class DateField extends Component {
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
                <input
                    className={this.props.showAlert ? "inputField border-1 border-accent" : "inputField"}
                    type="date"
                    min={this.props.min}
                    max={this.props.max}
                    placeholder={this.props.placeholder}
                    id={this.props.id}
                    value={this.props.response || ""}
                    onChange={this.props.handleResponseChange}
                    required
                />
                <Alert showAlert={this.props.showAlert} label={this.props.label} />
            </div>
        )
    }
}

const MySection = handleViewport(DateField, { rootMargin: "-1.0px" })

export default MySection
