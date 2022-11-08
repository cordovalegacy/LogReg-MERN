import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import './App.css';



function App() {

    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path='/' element={<LogReg />} />
                    <Route path='/home' element={<LogReg />} />
                    <Route path='/' element={<LogReg />} />
                    <Route path='/' element={<LogReg />} />
                    <Route path='/' element={<LogReg />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;