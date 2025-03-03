import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Form from './Form';
import Table from './Table';

function RouterApp() {
    return (
        <Router>
            <div className="container mt-4">
                <nav>
                    <ul className="nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Formulario</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/table">Tabla</Link>
                        </li>
                    </ul>
                </nav>

                <Routes>
                    <Route path="/" element={<Form />} />
                    <Route path="/table" element={<Table />} />
                </Routes>   
            </div>
        </Router>
    );
}
export default RouterApp;
