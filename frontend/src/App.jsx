import Home from './pages/Home.jsx';
import './styles/App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"; // FIX 1: Use react-router-dom
import Dashboard from "./pages/Dashboard.jsx";
import Product from "./features/product/Product.jsx";
import LoginPage from "./features/auth/LoginPage.jsx";
import SignUpPage from "./features/auth/SignUpPage.jsx";
import ForgetPassword from "./features/auth/ForgetPassword.jsx";
import ResetPassword from "./features/auth/ResetPassword.jsx";
import Verification from "./features/auth/Verification.jsx";
import AuthProvider from "./AuthContext/AuthProvider.jsx";
import ProtectedRoutes from "./routes/ProtectedRoutes.jsx";
import AdminRoutes from "./routes/AdminRoutes.jsx"; // Import the new wrapper
import UserManagement from "./pages/admin/UserManagement.jsx";
import Profile from "./pages/Profile.jsx";

export default function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/forget-password" element={<ForgetPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/verify" element={<Verification />} />

                    {/* General Protected Routes (Staff & Admin) */}
                    <Route element={<ProtectedRoutes />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path={"/profile"} element={<Profile/>}/>
                        <Route path="/products" element={<Product />} />
                    </Route>

                    <Route element={<AdminRoutes />}>
                        <Route path="/admin" element={<UserManagement />} />
                    </Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}