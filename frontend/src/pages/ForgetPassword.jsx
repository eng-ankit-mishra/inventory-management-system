import Button from "../components/Button.jsx";
import Navbar from "../components/Navbar.jsx";
import {useNavigate} from "react-router-dom"

export default function ForgetPassword() {
    const navigate=useNavigate();
    return (
        <section className="forget-password">
            <Navbar AuthRequired={false} />
            <main className={"forget-password-card"}>
                <h4>Reset your password</h4>
                <p>Please provide your email and a new password.</p>
                <form className={"forget-password-form"}>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                    />

                    <label htmlFor="password">New Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Enter your new password"
                    />

                    <Button onClick={()=>navigate("/login")}>Submit</Button>
                </form>
            </main>

        </section>
    );
}
