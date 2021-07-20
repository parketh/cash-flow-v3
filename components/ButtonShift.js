import React, { Component } from "react"
import handleViewport from "react-in-viewport"

class ButtonShift extends Component {
    getStyle() {
        const { inViewport, enterCount } = this.props
        if (inViewport && enterCount === 1) {
            return "animate-fadeIn";
        } else {
            return "";
        }
    }
    
    render() {
        if (this.props.saveStatus === 1) {
            return (
                <div className={this.getStyle()}>
                    <div className="w-400 md:w-80 h-10 mt-2">
                        <button className="h-full w-full rounded bg-green-700 font-bold text-white text-center">Success!</button>
                    </div>
                </div>
            )
        } else if (this.props.saveStatus === -1) {
            return (
                <div className={this.getStyle()}>
                    <div className="w-400 md:w-80 h-10 mt-2">
                        <button className="h-full w-full rounded bg-accent-dark font-bold text-white">Missing fields</button>
                    </div>
                </div>
            )
        } else {
            return (
                <div className={this.getStyle()}>
                    <div className="w-400 md:w-80 h-10 mt-2">
                        <input className="h-full w-full rounded bg-theme font-bold text-white hover:bg-theme-medium active:bg-theme-dark text-center" onClick={this.props.onClick} value={this.props.value} type="submit" />
                    </div>
                </div>
            )
        }
        
        
    }
}

const MySection = handleViewport(ButtonShift, { rootMargin: '-1.0px' });

export default MySection




