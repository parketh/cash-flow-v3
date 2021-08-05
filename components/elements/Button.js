import React, { Component } from "react"
import handleViewport from "react-in-viewport"

class Button extends Component {
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
                <div className={this.props.wrapperStyle}>
                    <input
                        className={this.props.buttonStyle}
                        onClick={this.props.onClick || ""}
                        value={this.props.value}
                        type="submit"
                    />
                </div>
            </div>
        )
    }
}

const ButtonWrapped = handleViewport(Button, { rootMargin: "-1.0px" })

export default ButtonWrapped
