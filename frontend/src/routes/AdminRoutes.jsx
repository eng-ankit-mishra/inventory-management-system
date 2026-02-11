import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../AuthContext/AuthProvider";

const AdminRoutes = () => {
    const { user } = useContext(AuthContext);


    if (!user) {
        return <Navigate to="/login" replace />;
    }
    if (!(user.role==="ADMIN")) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
};

export default AdminRoutes;