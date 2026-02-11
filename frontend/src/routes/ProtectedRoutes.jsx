import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../AuthContext/AuthProvider.jsx";

export default function ProtectedRoutes() {
    const contextData = useContext(AuthContext);
    if (!contextData) {
        return <Navigate to="/login" replace />;
    }
    const { user } = contextData;

    if (!user) {
        return <Navigate to="/login" replace />;
    }
    return <Outlet />;
}