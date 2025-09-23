import type { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

const PrivateRoute = ({ children}: { children: JSX.Element }) => {
    const { token } = useAppSelector((state) => state.auth);
    return token ? children : <Navigate to="/login" replace />;
}

export default PrivateRoute;