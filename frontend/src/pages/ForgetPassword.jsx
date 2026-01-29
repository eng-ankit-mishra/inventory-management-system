import Button from "../components/Button.jsx";
import Navbar from "../components/Navbar.jsx";

export default function ForgetPassword() {
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

                    <Button type="submit">Submit</Button>
                </form>
            </main>

        </section>
    );
}
