import React from "react";
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="container home-container">
            <h1 className="main-title">Welcome To Task Manager</h1>
            <div className="home-links">
                <Link className="link home-link" to="/register">Register</Link>
                <span className="divider">|</span>
                <Link className="link home-link" to="/login">Login</Link>
            </div>
        </div>
    );
}

export default Home;
