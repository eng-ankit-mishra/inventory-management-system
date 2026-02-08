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

    // Fetch Transaction History on Load
    // useEffect(() => {
    //     fetch("http://localhost:8080/api/transactions/my-history", {
    //         headers: {
    //             "Authorization": `Bearer ${localStorage.getItem("token")}`
    //         }
    //     })
    //         .then(res => res.json())
    //         .then(data => setTransactions(data))
    //         .catch(err => console.error("Failed to load history", err));
    // }, []);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="profile-page">
            <Navbar />
            <div className="profile-container">
                <div className="profile-card">
                    {/* ... Existing Avatar & Role Code ... */}
                    <div className="profile-avatar">
                        {user?.email?.charAt(0).toUpperCase()}
                    </div>
                    <h2 className="profile-email">{user?.email}</h2>
                    <span className="role-badge badge-staff">{user?.role}</span>

                    {/* NEW SECTION: Transaction History Table */}
                    <div className="history-section">
                        <h3>🕒 Recent Activity</h3>
                        {transactions.length === 0 ? (
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
                                    {transactions.map(log => (
                                        <tr key={log.id}>
                                            <td>
                                                <span className={`status-dot ${log.action === "ADDED" ? "dot-green" : "dot-blue"}`}></span>
                                                {log.action}
                                            </td>
                                            <td>{log.productName}</td>
                                            <td>{new Date(log.timestamp).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                    <div className="profile-actions">
                        <Button style={"secondary"} onClick={handleLogout}>Logout</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}