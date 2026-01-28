import Navbar from "../components/Navbar.jsx";
import Button from "../components/Button.jsx";

export default function LoginPage() {
    return(
        <section className="login-page">
            <Navbar/>
            <main className="login-card">
                <h4>Welcome Back</h4>
                <p>Please Sign in to your account</p>
                <form className="login-form">
                    <label>Email : </label>
                    <input name="email" type="email" />
                    <label>Password: </label>
                    <input name="password" type="password" />
                    <Button>Login</Button>
                </form>
                <a>Forget your password?</a>
            </main>
        </section>
    )
}