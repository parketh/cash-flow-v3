import React, { Component } from "react"
import handleViewport from "react-in-viewport"

class SectionHeader extends Component {
    getStyle() {
        const { inViewport, enterCount } = this.props
        if (inViewport && enterCount === 1) {
            return "animate-easeIn"
        } else {
            return ""
        }
    }

    render() {
        return (
            <div ref={this.ref} className={"justify-left items-center space-x-1 mb-2 mt-3 " + this.getStyle()}>
                <span className="font-bold text-sm">{this.props.title} /</span>
                <span className="font-semibold text-sm text-gray-400">{this.props.subtitle}</span>
            </div>
        )
    }
}

const SectionHeaderWrapped = handleViewport(SectionHeader, { rootMargin: "-1.0px" })

export default SectionHeaderWrapped
