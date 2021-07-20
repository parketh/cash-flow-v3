import React, { Component } from 'react'

class ScrollToTop extends Component {
    
    componentDidMount() {
        this._div.scrollTop = 0
    }

    render() {
        return <div ref={(ref) => this._div = ref} />
    }
}

export default ScrollToTop


