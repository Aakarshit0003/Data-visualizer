import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MainPage from './Components/MainPage/mainPage';
import { map } from '../src/Components/Maps/map'

import { Component } from 'react'
import Header from './Components/Header/Header';

export default class Index extends Component {
    render() {
        return (
            <div>
                <Header />
                <MainPage />
            </div>
        )
    }
}

ReactDOM.render(
<Index />, 
document.getElementById('root')
);