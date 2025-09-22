import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { loginUser } from "../store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

const Login: React.FC = () => {
    const dispatch = useAppDispatch();
    const { loading, error, token } = useAppSelector((state) => state.auth);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            navigate('/dashboard');
        }
    }, [token, navigate]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        // try {
        //     const response = await api.post('/api/auth/login', { email, password });
        //     localStorage.setItem('token', response.data.token);
        //     navigate('/dashboard');
        // }catch (error) {
        //     console.error("Login failed", error);
        // }
        if (!email || !password) return;
        dispatch(loginUser({ email, password }));
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
                required
                />
                <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                required
                minLength={6}
                />
                <button 
                    type="submit"
                    disabled={loading} 
                    className="btn">
                {loading ? "Logging in..." : "Login"}
                </button>
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </form>
            </div>
    );
}

export default Login;