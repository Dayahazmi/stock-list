"use client";

import { useState } from 'react';
import LoginPage from './login/login'; // Adjust the path as necessary

const Login = () => {
    const [showLoginPage, setShowLoginPage] = useState(false);

    const handleLogin = () => {
        setShowLoginPage(true);
    };

    return (
        <div>
            {!showLoginPage ? (
                <button onClick={handleLogin}>Login</button>
            ) : (
                <LoginPage />
            )}
        </div>
    );
}

export default Login;
