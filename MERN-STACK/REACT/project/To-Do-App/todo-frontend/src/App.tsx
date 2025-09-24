import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./pages/PrivateRoute";
import { useEffect } from "react";
import { useAppDispatch } from "./store/hooks";
import { checkAuth } from "./store/slices/authSlice";

export default function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuth()); // refresh token → accessToken (On page refresh, call refresh-token api to return new access_token as it was lost from redux state on page refresh)
  }, [dispatch]);
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/dashboard"
          element={<PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                  }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
      {/* ✅ Global Toast Container */}
      <ToastContainer position="top-center" autoClose={3000} />
    </Router>
  )
}