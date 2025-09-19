import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import type { JSX } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function PrivateRoute({ children }: { children: JSX.Element }) {
 const token = localStorage.getItem("token");
 return token ? children : <Navigate to="/login" replace />; 
}
export default function App() {
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
    </Router>
  )
}