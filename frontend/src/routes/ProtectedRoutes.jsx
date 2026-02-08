import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../AuthContext/AuthProvider.jsx";

export default function ProtectedRoutes() {
    const contextData = useContext(AuthContext);

    console.log("--- PROTECTED ROUTE DEBUG ---");
    console.log("Context Value:", contextData);

    // Safety check: If context is null, the Provider isn't wrapping the App correctly
    if (!contextData) {
        console.error("CRITICAL: AuthContext is null! Check App.jsx wrapping.");
        return <Navigate to="/login" replace />;
    }

    const { user } = contextData;

    if (!user) {
        console.warn("Access Denied: User is null");
        return <Navigate to="/login" replace />;
    }

    console.log("Access Granted to:", user.email);
    return <Outlet />;
}