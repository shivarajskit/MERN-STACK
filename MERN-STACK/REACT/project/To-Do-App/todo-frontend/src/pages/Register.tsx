import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useForm } from "react-hook-form";
import { registerSchema, type RegisterSchemaType } from "../validation/registerSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerUser } from "../store/slices/authSlice";

const Register: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { loading, error} = useAppSelector((state) => state.auth);

    const { register, handleSubmit, formState: { errors} } = useForm<RegisterSchemaType>({
        resolver: yupResolver(registerSchema)
    })

    const onSubmit = async (data: RegisterSchemaType) => {
        try {
            await dispatch(registerUser(data)).unwrap(); // ✅ unwrap rejects on error
            navigate("/login"); // ✅ redirect on success
        } catch (err) {
            console.error("Registration failed:", err);
        }
    }
    return (
        <div className="max-w-md mx-auto mt-10 p-4 border rounded card">
            <h2 className="text-xl font-bold mb-4 heading-xl">Register</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                <input
                type="text"
                placeholder="Name"
                {...register("userName")}
                className="w-full p-2 border rounded input"
                />
                {errors.userName && <p className="text-red-500 text-sm">{errors.userName.message}</p>}
                <input
                type="email"
                placeholder="Email"
                {...register("email")}
                className="w-full p-2 border rounded input"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                <input
                type="password"
                placeholder="Password"
                {...register("password")}
                className="w-full p-2 border rounded input"
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-green-600 text-white p-2 w-full rounded hover:bg-green-700"
                >
                    {loading ? "Registering..." : "Register"}
                </button>
                <Link to='/login' className="auth-link">Already have an account? Login</Link>
                {error && <p className="text-red-600">{error}</p>}
            </form>
        </div>
    )
}

export default Register;