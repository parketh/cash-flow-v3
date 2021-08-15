import React, { Component } from "react"
import handleViewport from "react-in-viewport"
import FieldLabel from "@Elements/FieldLabel"
import Alert from "@Elements/Alert"

class YearSelectorField extends Component {
    getStyle() {
        const { inViewport, enterCount } = this.props
        if (inViewport && enterCount === 1) {
            return "animate-fadeIn"
        } else {
            return ""
        }
    }

    render() {
        const response = (e) => {
            e.preventDefault()
            return false
        }

        return (
            <div className={"space-y-1 " + this.getStyle()}>
                <FieldLabel label={this.props.label} />
                <input
                    className={"inputField w-full " + (this.props.showAlert ? "border-1 border-accent" : "")}
                    type="number"
                    step={this.props.step}
                    placeholder={this.props.placeholder}
                    id={this.props.id}
                    value={this.props.response || ""}
                    onChange={this.props.handleResponseChange}
                    onKeyPress={response}
                    onDragStart={response}
                    onSelect={response}
                    onCut={response}
                    onCopy={response}
                    onPaste={response}
                    onDrag={response}
                    onDrop={response}
                />
                <Alert showAlert={this.props.showAlert} label={this.props.label} />
            </div>
        )
    }
}

const MySection = handleViewport(YearSelectorField, { rootMargin: "-1.0px" })

export default MySection
