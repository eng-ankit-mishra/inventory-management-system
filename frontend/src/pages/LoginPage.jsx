import Navbar from "../components/Navbar.jsx";
import Button from "../components/Button.jsx";
import {Link, useNavigate} from "react-router-dom";

export default function LoginPage() {

    const navigate=useNavigate()
    return(
        <section className="login-page">
            <Navbar AuthRequired={false}/>
            <main className="login-card">
                <h4>Welcome Back</h4>
                <p>Please Sign in to your account</p>
                <form className="login-form">
                    <label>Email : </label>
                    <input name="email" type="email" placeholder={"Enter your email"}/>
                    <label>Password: </label>
                    <input name="password" type="password" placeholder={"Enter your password"}/>
                    <Button onClick={()=>navigate("/dashboard")}>Login</Button>
                </form>
                <a>Forget your password?</a>
                <p className="auth-switch">
                    Don't have an account? <Link to="/signup">Signup</Link>
                </p>
            </main>
        </section>
    )
}