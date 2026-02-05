import Navbar from "../../components/layout/Navbar.jsx";
import Button from "../../components/common/Button.jsx";
import {Link} from "react-router-dom";

export default function LoginPage() {


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

                localStorage.setItem("jwtToken",data.token);
                console.log("Login Successful! Token stored");

                window.location.href="/dashboard";
            }else{
                console.log("Invalid Credential!")
            }
        }catch(err){
            console.error("Error",err);
        }
    }
    return(
        <section className="login-page">
            <Navbar AuthRequired={false}/>
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