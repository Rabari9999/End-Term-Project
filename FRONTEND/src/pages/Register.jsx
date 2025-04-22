import React, { useState } from "react";
import API from '../utils/api';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);
        try {
            await API.post('/auth/register', { email, password });
            setMessage('Registration successful! Redirecting to login...');
            setTimeout(() => navigate('/login'), 1500);
        } catch (err) {
            setMessage(err.response?.data?.error || 'Registration failed');
        }
        setLoading(false);
    };

    return (
        <div className="container register-container">
            <h2 className="form-title">Register Page</h2>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Email: </label>
                    <input
                        className="input"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Password: </label>
                    <input
                        className="input"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button className="submit-btn" type="submit" disabled={loading}>
                    {loading ? "Registering..." : "Register"}
                </button>
            </form>
            {message && (
                <div className={message.startsWith('Registration successful') ? "success message" : "error message"}>
                    {message}
                </div>
            )}
        </div>
    );
}

export default Register;
