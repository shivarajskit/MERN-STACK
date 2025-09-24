import type { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

const PrivateRoute = ({ children}: { children: JSX.Element }) => {
    const { token, loading } = useAppSelector((state) => state.auth);
    if (loading) return <p>Loading...</p>; // wait for checkAuth
    return token ? children : <Navigate to="/login" replace />;
}

export default PrivateRoute;