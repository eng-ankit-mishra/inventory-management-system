import { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Button from "../../components/common/Button.jsx";
import api from "../../api/axiosClient.js"; // Standardized API client

export default function UserManagement() {
    const [pendingUsers, setPendingUsers] = useState([]);
    const [activeUsers, setActiveUsers] = useState([]); // <--- 1. New State
    const [msg, setMsg] = useState("");

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                // 2. Fetch both lists in parallel for better performance
                const [pendingRes, activeRes] = await Promise.all([
                    api.get("/api/admin/pending-users"),
                    api.get("/api/admin/active-users") // Assumed Endpoint
                ]);

                setPendingUsers(pendingRes.data);
                setActiveUsers(activeRes.data);
            } catch (err) {
                console.error("Failed to load users:", err);
            }
        };

        void fetchAllData();
    }, []);

    // 3. Updated Logic: Move User from Pending -> Active
    const handleApprove = async (user) => {
        try {
            // Using 'api' instance instead of raw 'fetch' for consistency
            await api.put(`/api/admin/approve/${user.id}`);

            setMsg(`${user.email} approved!`);

            // UI Optimistic Update:
            // A. Remove from Pending
            setPendingUsers((prev) => prev.filter((u) => u.id !== user.id));

            // B. Add to Active (immediately shows up in the bottom table)
            setActiveUsers((prev) => [...prev, { ...user, enabled: true }]);

        } catch (err) {
            console.error("Approval failed:", err);
            setMsg("Failed to approve user.");
        }
    };

    return (
        <div className="admin-users-page">
            <Navbar />
            <div className="container">
                <h2>Manage Team</h2>
                {msg && <p className="success-msg">{msg}</p>}

                {/* --- PENDING SECTION --- */}
                <div className="pending-section">
                    <h3>Pending Approvals</h3>
                    {pendingUsers.length === 0 ? (
                        <p className="text-muted">No pending requests.</p>
                    ) : (
                        <table className="user-table">
                            <thead>
                            <tr>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {pendingUsers.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        <Button
                                            className="approve-btn"
                                            // Pass the whole user object so we can move it
                                            onClick={() => handleApprove(user)}
                                        >
                                            Approve
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* --- ACTIVE STAFF SECTION (Implemented) --- */}
                <div className="staff-section" style={{ marginTop: "2rem" }}>
                    <h3>Active Staff</h3>
                    {activeUsers.length === 0 ? (
                        <p className="text-muted">No active staff found.</p>
                    ) : (
                        <table className="user-table">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            {activeUsers.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.email}</td>
                                    <td>
                                            <span className={`badge role-${user.role.toLowerCase()}`}>
                                                {user.role}
                                            </span>
                                    </td>
                                    <td>
                                        <span className="status-active">Active</span>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}