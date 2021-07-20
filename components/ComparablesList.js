import React, { Component } from "react"
import handleViewport from "react-in-viewport"

class ComparablesList extends Component {
    getStyle() {
        const { inViewport, enterCount } = this.props
        if (inViewport && enterCount === 1) {
            return "animate-fadeIn";
        } else {
            return "";
        }
    }
    
    render() {
        if (typeof(this.props.comps) != "undefined" && this.props.comps.length > 0) {
            return (
                <div className={this.getStyle()}>
                    <table className="text-left w-full mt-2">
                        <thead>
                            <tr className="font-bold text-xs h-8">
                                <th>Company</th>
                                <th>Stock ticker / CIQ Ticker</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className="align-middle divide-y-2">
                            {this.props.comps.map((comp) => (
                                <tr key={comp.id} >
                                    <td>{comp.name}</td>
                                    <td>{comp.ciqId}</td>
                                    <td className="text-center align-middle pt-1">
                                        <input type="image" className="hover:opacity-50" onClick={this.props.removeComp} alt="delete" id={comp.id} src="images/remove.png" height="17px" width="17px" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )
        }
        else {
            return (
                <div></div>
            )
        }
    }
}

const MySection = handleViewport(ComparablesList, { rootMargin: '-1.0px' });

export default MySection
