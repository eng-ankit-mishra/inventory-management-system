import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../AuthContext/AuthProvider.jsx";
import Button from "../common/Button.jsx";

export default function Navbar() {
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);

    function handleLogOut() {
        // Clear everything
        logout(); // The AuthContext handles localStorage removal now
        navigate("/login"); // Redirect to login, not "/k"
    }

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <h2>
                    <Link to={user ? "/dashboard" : "/"} className="app-name">
                        InventoryApp
                    </Link>
                </h2>
            </div>

            {user && (
                <div className="navbar-center">
                    <Link to="/dashboard" className="nav-link">Dashboard</Link>
                    <Link to="/products" className="nav-link">Products</Link>

                    {/* Admin Only Link */}
                    {user.role === "ADMIN" && (
                        <Link to="/admin" className="nav-link admin-link">
                            Manage Team
                        </Link>
                    )}
                </div>
            )}
            <div className="navbar-right">
                {!user ? (
                    <Button onClick={() => navigate("/login")}>Login / Register</Button>
                ) : (
                    <div className="user-menu">
                        {/* Profile Icon */}
                        <Link to="/profile" className="profile-icon" title={user.email}>
                            <div className="avatar-circle">
                                {user.role?.charAt(0).toUpperCase() || "U"}
                            </div>
                        </Link>

                        {/* Logout Button */}
                        <Button onClick={handleLogOut} className="logout-btn">
                            Logout
                        </Button>
                    </div>
                )}
            </div>
        </nav>
    );
}