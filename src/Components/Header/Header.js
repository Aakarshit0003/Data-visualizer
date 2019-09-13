import React, { Component } from 'react'
import { Navbar } from 'react-bootstrap'
import '../../css/style.css'

export default class Header extends Component {
    render() {
        return (
            <div>
                <Navbar bg = "dark" sticky = "top">
                    <Navbar.Brand className = "ml-4">
                        <h2 className = "heading">DataVisualizer <i class="far fa-chart-bar ml-2"></i></h2>
                    </Navbar.Brand>
                </Navbar>
            </div>
        )
    }
}
