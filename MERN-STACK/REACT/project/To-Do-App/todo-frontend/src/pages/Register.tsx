import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

const Register: React.FC = () => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/api/auth/register', { userName, email, password });
            alert("Registration successful! Please login.");
            navigate('/login');
        }catch (error) {
            console.error("Registration failed", error);
        }
    }
    return (
        <div className="max-w-md mx-auto mt-10 p-4 border rounded card">
            <h2 className="text-xl font-bold mb-4 heading-xl">Register</h2>
            <form onSubmit={handleRegister} className="space-y-3">
                <input
                type="text"
                placeholder="Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full p-2 border rounded input"
                />
                <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded input"
                />
                <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded input"
                />
                <button type="submit" className="w-full bg-green-500 text-white p-2 rounded btn">
                Register
                </button>
                <Link to='/login' className="auth-link">Already have an account? Login</Link>
            </form>
        </div>
    )
}

export default Register;