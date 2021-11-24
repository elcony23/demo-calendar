/* eslint-disable no-use-before-define */
import React from 'react';
import { DatePicker } from 'antd';
import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';

const App = function () {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>

            <DatePicker />
        </div>
    );
};
export default App;
