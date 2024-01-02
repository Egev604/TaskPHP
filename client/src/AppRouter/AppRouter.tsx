import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from "../components/Login/Login";
import Registration from "../components/Registration/Registration";
import MainPage from "../components/MainPage/MainPage";


const AppRouter = () => {
    const isUserLoggedIn = false;
    if(isUserLoggedIn)
    {
        return (
            <Router>
                <Routes>
                    <Route path="/" element={<Navigate to="/main" />} />
                    <Route path="/main" element={<MainPage />} />
                </Routes>
            </Router>
        )
    }
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Registration />} />
                {isUserLoggedIn ? (
                    <Route path="/main" element={<MainPage />} />
                ) : (
                    <Route path="/" element={<Navigate to="/login" />} />
                )}
            </Routes>
        </Router>
    );
};

export default AppRouter;