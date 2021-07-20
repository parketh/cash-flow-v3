import React, { Component } from "react"
import handleViewport from "react-in-viewport"
import FieldLabel from "./FieldLabel"
import Alert from "./Alert"

class DropDownField extends Component {
    getStyle() {
        const { inViewport, enterCount } = this.props
        if (inViewport && enterCount === 1) {
            return "animate-fadeIn";
        } else {
            return "";
        }
    }
    
    render() {
        return (
            <div className={this.getStyle()}>
                <div className="grid space-y-1">
                    <FieldLabel label={this.props.label} />
                    <select className={this.props.showAlert ? "inputField border-1 border-accent" : "inputField"} id={this.props.id} value={this.props.response} onChange={this.props.handleResponseChange} required>
                        <option value="" disabled>Select an option...</option>
                        {this.props.options.map((choice) => (
                            <option key={choice.value}>{choice.label}</option>
                        ))}
                    </select>
                    <Alert showAlert={this.props.showAlert} label={this.props.label} />
                </div>
            </div>
        )
    }
}

const MySection = handleViewport(DropDownField, { rootMargin: '-1.0px' });

export default MySection