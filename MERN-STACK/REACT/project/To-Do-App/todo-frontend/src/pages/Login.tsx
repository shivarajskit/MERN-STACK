import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { loginUser } from "../store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema, type LoginSchemaType } from "../validation/loginSchema";

const Login: React.FC = () => {
    const dispatch = useAppDispatch();
    const { loading, error, token } = useAppSelector((state) => state.auth);

    const {
        register, handleSubmit, formState: { errors}
    } = useForm({
        resolver: yupResolver(loginSchema)
    });


    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            navigate('/dashboard');
        }
    }, [token, navigate]);

    const onSubmit = (data: LoginSchemaType) => {
        dispatch(loginUser(data));
    }
    return (
        <div className="card">
            <h2 className="heading-xl">Login</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                <input
                type="email"
                placeholder="Email"
                className="input"
                {...register("email")}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                <input
                type="password"
                placeholder="Password"
                className="input"
                {...register("password")}
                />
                {errors.password && (
                    <p className="text-red-500 text-sm">{errors.password.message}</p>
                )}
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