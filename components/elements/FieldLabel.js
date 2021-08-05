import React, { Component } from "react"
import handleViewport from "react-in-viewport"

class FieldLabel extends Component {
    getStyle() {
        const { inViewport, enterCount } = this.props
        if (inViewport && enterCount === 1) {
            return "animate-easeInSlow"
        } else {
            return ""
        }
    }

    render() {
        return (
            <div className={this.getStyle()}>
                <span className={"font-bold text-xs"}>{this.props.label}</span>
            </div>
        )
    }
}

const FieldLabelWrapped = handleViewport(FieldLabel, { rootMargin: "-1.0px" })

export default FieldLabelWrapped
