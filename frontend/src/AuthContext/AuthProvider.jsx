import { createContext, useState } from "react";

const AuthContext = createContext(null);

export default function AuthProvider({ children }) {

    // Lazy Initialization
    const [user, setUser] = useState(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role"); // Read explicitly saved role

        if (!token || !role) return null;

        return { token, role }; // Now your user object has the role!
    });

    const login = (token,role) => {
        localStorage.setItem("token", token);
        localStorage.setItem("role",role);
        setUser({
            token: token,
            role: role
        });
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role")
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export {AuthContext}