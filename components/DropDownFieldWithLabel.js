import React, { Component } from "react"
import handleViewport from "react-in-viewport"
import DropDownField from "./DropDownField"

class DropDownFieldWithLabel extends Component {
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
                <div className="grid space-y-1 ">
                    <DropDownField label={this.props.label} options={this.props.options} id={this.props.id} response={this.props.response} handleResponseChange={this.props.handleResponseChange} showAlert={this.props.showAlert} />
                    {this.props.options.map((choice) => (
                        <div key={choice.value} className="leading-5 pl-3">
                            <span className="text-gray-400 text-sm font-bold">{ choice.label }: </span>
                            <span className="text-gray-400 text-sm">{ choice.description }</span>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

const MySection = handleViewport(DropDownFieldWithLabel, { rootMargin: '-1.0px' });

export default MySection