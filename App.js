import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import RouterView from './router/RouterView'
import routes from './router/rotuer-config'
import './mock/index'
import './App.scss'

export default class App extends Component {

    render() {
        return (
            <Router>
                <RouterView routes={routes} />
            </Router>
        )
    }
}
