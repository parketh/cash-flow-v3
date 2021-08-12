import React, { Component } from "react"
import handleViewport from "react-in-viewport"
import FieldLabel from "@Elements/FieldLabel"
import FieldSubLabel from "@Elements/FieldSubLabel"
import Alert from "@Elements/Alert"

import range from "@Utils/range"

class TimeSeriesField extends Component {
    getStyle() {
        const { inViewport, enterCount } = this.props
        if (inViewport && enterCount === 1) {
            return "animate-fadeIn"
        } else {
            return ""
        }
    }

    render() {
        const years = range(Number(this.props.start), Number(this.props.end) + 1)

        if (!this.props.start || !this.props.end || Number(this.props.start) > Number(this.props.end)) {
            return <></>
        }

        return (
            <div className={this.getStyle()}>
                <FieldLabel label={this.props.label} />
                <div
                    className={
                        "grid gap-4 grid-cols-" +
                        String(Math.min(4, years.length)) +
                        " sm:grid-cols-" +
                        String(Math.min(7, years.length))
                    }
                >
                    {years.map((year) => {
                        return (
                            <div className="col-span-1 relative" key={year}>
                                <FieldSubLabel label={year} />
                                <input
                                    className={
                                        "inputField percentValue w-full " +
                                        (this.props.showAlert[year] ? "border-1 border-accent" : "")
                                    }
                                    type="number"
                                    min={this.props.min}
                                    max={this.props.max}
                                    step={this.props.step}
                                    placeholder={this.props.placeholder}
                                    id={this.props.id}
                                    alt={year}
                                    value={String(this.props.response[year]) || ""}
                                    onChange={this.props.handleResponseChangeNested}
                                />
                                <span className="absolute right-2 mt-1 text-gray-500">%</span>
                                <Alert showAlert={this.props.showAlert[year]} label={this.props.label} />
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

const MySection = handleViewport(TimeSeriesField, { rootMargin: "-1.0px" })

export default MySection
