import React, { Component } from "react"
import handleViewport from "react-in-viewport"

class Footnote extends Component {
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
            <>
                <span className={"inline-block text-sm italic " + this.getStyle()}>{this.props.text}</span>
            </>
        )
    }
}

const FootnoteWrapped = handleViewport(Footnote, { rootMargin: "-1.0px" })

export default FootnoteWrapped
