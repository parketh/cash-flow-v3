import React, { Component } from "react"
import handleViewport from "react-in-viewport"

class FieldSubLabel extends Component {
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
                <span className={"font-medium text-xs"}>{this.props.label}</span>
            </div>
        )
    }
}

const FieldLabelWrapped = handleViewport(FieldSubLabel, { rootMargin: "-1.0px" })

export default FieldLabelWrapped
