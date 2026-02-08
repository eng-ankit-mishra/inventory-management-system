import Navbar from "../../components/layout/Navbar.jsx";
import Button from "../../components/common/Button.jsx";
import {Link} from "react-router-dom";
import {useState} from "react";

export default function SignUpPage() {

    const [msg,setMsg]=useState("")

    async function handleSubmit(e){
        e.preventDefault();
        const name=e.target.name.value;
        const email=e.target.email.value;
        const password=e.target.password.value;
        const role=e.target.role.value;

        try{
            const response=await fetch("http://localhost:8080/api/auth/register",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({name,email,password,role})
            })
            if(response.ok){
                const data=await response.text()
                setMsg("Registration Successful.Please check your email!");
                console.log(data);
                e.target.reset()
            }else{
                console.log("Something Went Wrong!",response)
                setMsg("Something went wrong.Please try again later!.");
            }
        }catch (err){
            console.log("error",err);
        }

    }

    return (
        <section className="signup-page">
            <Navbar/>

            <main className="signup-card">
                <h4>Create your account</h4>
                <p>Please fill in the details to get started</p>

                <form onSubmit={handleSubmit} className="signup-form">
                    <label>Name:</label>
                    <input name="name" type="text" placeholder="Enter your name" />

                    <label>Email:</label>
                    <input name="email" type="email" placeholder="Enter your email" />

                    <label>Password:</label>
                    <input name="password" type="password" placeholder="Create a password" />

                    <label>Role:</label>
                    <select name="role">
                        <option value="STAFF">Staff</option>
                        <option value="ADMIN">Admin</option>
                    </select>

                    <Button type={"submit"}>Sign Up</Button>
                </form>

                <p>{msg}</p>

                <p className="auth-switch">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </main>
        </section>
    );
}
