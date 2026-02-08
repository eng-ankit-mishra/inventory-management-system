import Navbar from "../../components/layout/Navbar.jsx";
import Button from "../../components/common/Button.jsx";
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../../AuthContext/AuthProvider.jsx";
import {useContext} from "react";

export default function LoginPage() {

    const {login}=useContext(AuthContext)

    const navigate=useNavigate()

    async function handleLogin(e){
        e.preventDefault();
        const email=e.target.email.value;
        const password=e.target.password.value;

        try{
            const response=await fetch("http://localhost:8080/api/auth/authenticate",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({email,password})
            });
            if(response.ok) {
                const data=await response.json();

                localStorage.setItem("token",data.token);
                localStorage.setItem("role",data.role);
                login(data.token,data.role)
                console.log("Login Successful! Token stored");
                navigate("/dashboard");
            }else{
                console.log("Invalid Credential!")
            }
        }catch(err){
            console.error("Error",err);
        }
    }
    return(
        <section className="login-page">
            <Navbar/>
            <main className="login-card">
                <h4>Welcome Back</h4>
                <p>Please Sign in to your account</p>
                <form onSubmit={handleLogin} className="login-form">
                    <label>Email : </label>
                    <input name="email" type="email" placeholder={"Enter your email"}/>
                    <label>Password: </label>
                    <input name="password" type="password" placeholder={"Enter your password"}/>
                    <Button type={"submit"}>Login</Button>
                </form>
                <Link to={"/forget-password"}>Forget your password?</Link>
                <p className="auth-switch">
                    Don't have an account? <Link to="/signup">Signup</Link>
                </p>
            </main>
        </section>
    )
}