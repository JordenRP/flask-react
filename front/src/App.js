import React from 'react';
import './App.css';
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="*" element={<Navigate to="/profile" />} />
            </Routes>
        </Router>
    );
}

export default App;
