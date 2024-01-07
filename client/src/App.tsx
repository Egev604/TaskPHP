import React, {useState} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import MainPage from "./components/MainPage/MainPage";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    if(loggedIn) {
        return (
            <Router>
                <Routes>
                    <Route path="/*" element={<MainPage onLogin={() => setLoggedIn(false)} />} />
                </Routes>
            </Router>
        )
    }
    return (
        <Router>
            <Routes>
                <Route path="/*" element={<Login onLogin={() => setLoggedIn(true)} />} />
                <Route path="/registration" element={<Registration onLogin={() => setLoggedIn(true)} />} />
                <Route path="/login" element={<Login onLogin={() => setLoggedIn(true)} />} />
            </Routes>
        </Router>
    );
}

export default App;
