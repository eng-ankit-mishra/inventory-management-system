import Navbar from "../components/layout/Navbar";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext/AuthProvider";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import Button from "../components/common/Button.jsx";


export default function Profile() {
    const { user, logout } = useContext(AuthContext);
    const [transactions, setTransactions] = useState([]);
    const navigate = useNavigate();

    // 1. FIXED FETCH LOGIC
    useEffect(() => {
        async function fetchHistory() {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const response = await fetch("http://localhost:8080/api/transactions/my-history", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                // 2. CHECK STATUS BEFORE PARSING
                if (response.ok) {
                    const data = await response.json();
                    setTransactions(data);
                } else {
                    console.warn("Failed to load history. Status:", response.status);
                    // If 403, it means the backend SecurityConfig isn't updated yet
                }
            } catch (err) {
                console.error("Network error:", err);
            }
        }

        fetchHistory();
    }, []);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="profile-page">
            <Navbar />
            <div className="profile-container">
                <div className="profile-card">

                    {/* Safety Check: Only charAt if email exists */}
                    <div className="profile-avatar">
                        {user?.email ? user.email.charAt(0).toUpperCase() : "U"}
                    </div>
                    <h2 className="profile-email">{user?.email || "User"}</h2>

                    {/* Dynamic Role Badge */}
                    <span className={`role-badge ${user?.role === 'ADMIN' ? 'badge-admin' : 'badge-staff'}`}>
                        {user?.role || "STAFF"}
                    </span>

                    <div className="history-section">
                        <h3>🕒 Recent Activity</h3>
                        {/* 3. Handle Empty State vs Loading State */}
                        {!transactions || transactions.length === 0 ? (
                            <p className="no-data">No updates made yet.</p>
                        ) : (
                            <div className="table-wrapper">
                                <table className="history-table">
                                    <thead>
                                    <tr>
                                        <th>Action</th>
                                        <th>Product</th>
                                        <th>Time</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {transactions.slice(0,5).map(log => (
                                        <tr key={log.id}>
                                            <td>
                                                <span className={`status-dot ${log.action === "ADDED" ? "dot-green" : "dot-blue"}`}></span>
                                                {log.action}
                                            </td>
                                            <td>{log.productName}</td>
                                            {/* Safety Check: Ensure timestamp exists */}
                                            <td>{log.timestamp ? new Date(log.timestamp).toLocaleDateString() : "N/A"}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                    <div className="profile-actions">
                        {/* Ensure Button accepts className or style prop correctly */}
                        <Button className="btn-secondary" onClick={handleLogout}>Logout</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}