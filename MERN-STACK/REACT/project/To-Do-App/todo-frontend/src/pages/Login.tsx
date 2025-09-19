import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post('/api/auth/login', { email, password });
            localStorage.setItem('token', response.data.token);
            navigate('/dashboard');
        }catch (error) {
            console.error("Login failed", error);
        }
    }
    return (
        <div className="card">
            <h2 className="heading-xl">Login</h2>
            <form onSubmit={handleLogin} className="space-y-3">
                <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                />
                <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                />
                <button type="submit" className="btn">
                Login
                </button>
            </form>
            </div>
    );
}

export default Login;