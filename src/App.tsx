import React from 'react';
import { DatePicker } from 'antd';
import { useDispatch } from 'react-redux';
import logo from './logo.svg';
import './App.css';
import { changeAppointment } from './redux/appointmentSlice';

const App = function () {
    const dispatch = useDispatch();
    const testRedux = () => {
        dispatch(changeAppointment({ appointments: [0, 10, 20] }));
    };
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
            <button type="button" onClick={() => testRedux()}>
                Test Redux
            </button>
            <DatePicker />
        </div>
    );
};
export default App;
