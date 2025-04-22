import React, { useState } from "react";
import API from '../utils/api';
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);
        try {
            const res = await API.post('/auth/login', { email, password });
            localStorage.setItem('token', res.data.token);
            setMessage('Login successful! Redirecting...');
            setTimeout(() => navigate('/tasks'), 1500);
        } catch (err) {
            setMessage(err.response?.data?.error || 'Login failed');
        }
        setLoading(false);
    };

    return (
        <div className="container login-container">
            <h2 className="form-title">Login Page</h2>
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
                    {loading ? "Logging in..." : "Submit"}
                </button>
            </form>
            {message && (
                <div className={message.startsWith('Login successful') ? "success message" : "error message"}>
                    {message}
                </div>
            )}
        </div>
    );
}

export default Login;
