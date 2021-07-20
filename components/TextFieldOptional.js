import React, { Component } from "react"
import handleViewport from "react-in-viewport"
import Alert from "./Alert"

class TextFieldOptional extends Component {
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
                <input type="text" className={this.props.showAlert ? "inputField w-full md:w-auto border-1 border-accent" : "inputField w-full md:w-auto"} value={this.props.value} placeholder={this.props.placeholder} onChange={this.props.onChange} id={this.props.id} required/>
                <Alert showAlert={this.props.showAlert} label={this.props.placeholder} />
            </div>
        )
    }
}

const MySection = handleViewport(TextFieldOptional, { rootMargin: '-1.0px' });

export default MySection
