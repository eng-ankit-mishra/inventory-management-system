import Button from "../../components/common/Button.jsx";
import Navbar from "../../components/layout/Navbar.jsx";
import {useState} from "react";
import api from "../../api/axiosClient.js";

export default function ForgetPassword() {
    const [msg,setMessage]=useState("");

    const [loading,setLoading]=useState(false)


    async function handleSubmit(e){
        e.preventDefault();
        const email=e.target.email.value;
        setLoading(true)

        try{
                await api.post(`/api/auth/forgot-password?email=${email}`)
                setMessage("A reset link has been sent.")
        }catch(err){
            console.log("Failed : ",err.response ? err.response.data : err.message);
        }finally {
            setLoading(false)
        }

    }

    return (
        <section className="forget-password">
            <Navbar AuthRequired={true} />
            <main className={"forget-password-card"}>
                <h4>Reset your password</h4>
                <p>Please provide your email.</p>
                <form onSubmit={handleSubmit} className={"forget-password-form"}>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        name={"email"}
                        type="email"
                        placeholder="Enter your email"
                    />
                    <Button disabled={loading} type={"submit"}>{loading ? "Sending..." : "Send Reset Link" }</Button>
                </form>
                <p>{msg}</p>
            </main>

        </section>
    );
}
