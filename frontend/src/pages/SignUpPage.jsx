import Navbar from "../components/Navbar.jsx";
import Button from "../components/Button.jsx";

export default function SignUpPage() {
    return (
        <section className="signup-page">
            <Navbar AuthRequired={false} />

            <main className="signup-card">
                <h4>Create your account</h4>
                <p>Please fill in the details to get started</p>

                <form className="signup-form">
                    <label>Name:</label>
                    <input name="name" type="text" placeholder="Enter your name" />

                    <label>Email:</label>
                    <input name="email" type="email" placeholder="Enter your email" />

                    <label>Password:</label>
                    <input name="password" type="password" placeholder="Create a password" />

                    <label>Role:</label>
                    <select name="role">
                        <option value="">Select role</option>
                        <option value="admin">Admin</option>
                        <option value="manager">Manager</option>
                        <option value="staff">Staff</option>
                    </select>

                    <Button>Sign Up</Button>
                </form>

                <p className="auth-switch">
                    Already have an account? <a href="/login">Login</a>
                </p>
            </main>
        </section>
    );
}
