import Button from "../../components/common/Button.jsx";
import Navbar from "../../components/layout/Navbar.jsx";
import {useNavigate} from "react-router-dom"
import {useState} from "react";

export default function ForgetPassword() {
    const [msg,setMessage]=useState("");
    const navigate=useNavigate();

    async function handleSubmit(e){
        e.preventDefault();
        const email=e.target.email.value;

        try{
            const response=await fetch(`http://localhost:8080/api/auth/forgot-password?email=${email}`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                }
            })
            if(response.ok){
                console.log(response)
                setMessage("A reset link has been sent.")
            }else{
                console.log(response)
                setMessage("User not found")
            }
        }catch(err){
            console.error("Error",err);
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
                    <Button type={"submit"}>Send Reset Link</Button>
                </form>
                <p>{msg}</p>
            </main>

        </section>
    );
}
