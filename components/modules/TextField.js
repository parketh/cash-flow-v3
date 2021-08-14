import React, { Component } from "react"
import handleViewport from "react-in-viewport"
import FieldLabel from "@Elements/FieldLabel"
import Alert from "@Elements/Alert"

class TextField extends Component {
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
                    type={this.props.type || "text"}
                    placeholder={this.props.placeholder}
                    id={this.props.id}
                    value={this.props.response || ""}
                    onChange={this.props.handleResponseChange}
                    className={this.props.showAlert ? "inputField border-1 border-accent" : "inputField"}
                    required
                />
                <Alert showAlert={this.props.showAlert} label={this.props.label} />
            </div>
        )
    }
}

const MySection = handleViewport(TextField, { rootMargin: "-1.0px" })

export default MySection
