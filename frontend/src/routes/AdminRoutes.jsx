import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../AuthContext/AuthProvider";

const AdminRoutes = () => {
    const { user } = useContext(AuthContext);

    // 1. Debugging: See exactly what the role is in the console
    console.log("Current User Role:", user?.role);

    if (!user) {
        return <Navigate to="/login" replace />;
    }
    if (!(user.role==="ADMIN")) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
};

export default AdminRoutes;