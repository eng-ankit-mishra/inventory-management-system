import { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Button from "../../components/common/Button.jsx";
import api from "../../api/axiosClient.js";

export default function UserManagement() {
    const [pendingUsers, setPendingUsers] = useState([]);
    const [msg, setMsg] = useState("");

    useEffect(() => {
        const fetchData=async ()=>{
            try{
                const response=await api.get("/api/admin/pending-users");
                setPendingUsers(response.data)
            }catch(err){
                console.log("Failed : ",err.response ? err.response.status : err.message);
            }
        }

        void fetchData()
    }


    , []);

    const handleApprove = async (id) => {
        try {
            const res = await fetch(`http://localhost:8080/api/admin/approve/${id}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });
            if (res.ok) {
                setMsg("User approved!");
                // Remove user from list UI immediately
                setPendingUsers(pendingUsers.filter(u => u.id !== id));
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="admin-users-page">
            <Navbar />
            <div className="container">
                <h2>Manage Team</h2>
                {msg && <p className="success-msg">{msg}</p>}
                <div className="pending-section">
                    <h3>⚠️ Pending Approvals</h3>
                    {pendingUsers.length === 0 ? (
                        <p>No pending requests.</p>
                    ) : (
                        <table>
                            <thead>
                            <tr>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {pendingUsers.map(user => (
                                <tr key={user.id}>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        <Button
                                            className="approve-btn"
                                            onClick={() => handleApprove(user.id)}
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

                {/* Section 2: Active Staff List (You can add this later) */}
                <div className="staff-section">
                    <h3>Active Staff</h3>
                    <p>List of active users goes here...</p>
                </div>
            </div>
        </div>
    );
}