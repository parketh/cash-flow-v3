import React, { Component } from "react"
import handleViewport from "react-in-viewport"

import FormService from "~/services/FormService"

class ComparablesList extends Component {
    getStyle = () => {
        const { inViewport, enterCount } = this.props
        if (inViewport && enterCount === 1) {
            return "animate-fadeIn"
        } else {
            return ""
        }
    }

    removeComp = (event) => {
        event.preventDefault()
        const compToDelete = this.props.responses.comps.filter((comp) => comp.id === event.target.id)[0]
        if (window.confirm(`Delete ${compToDelete.name} ?`)) {
            this.props.setResponses({
                ...this.props.responses,
                comps: this.props.responses.comps.filter((comp) => comp.id !== event.target.id),
            })
        }
    }

    render() {
        if (typeof this.props.responses.comps != "undefined" && this.props.responses.comps.length > 0) {
            return (
                <>
                    <table className={"text-left w-full mt-2 " + this.getStyle()}>
                        <thead>
                            <tr className="font-bold text-xs h-8">
                                <th>Company</th>
                                <th>Stock ticker / CIQ Ticker</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className="align-middle divide-y-2">
                            {this.props.responses.comps.map((comp) => (
                                <tr key={comp.id}>
                                    <td>{comp.name}</td>
                                    <td>{comp.ciqId}</td>
                                    <td className="text-center align-middle pt-1">
                                        <input
                                            type="image"
                                            className="hover:opacity-50"
                                            onClick={this.removeComp}
                                            alt="delete"
                                            id={comp.id}
                                            src="images/remove.png"
                                            height="17px"
                                            width="17px"
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )
        } else {
            return <></>
        }
    }
}

const MySection = handleViewport(ComparablesList, { rootMargin: "-1.0px" })

export default MySection
