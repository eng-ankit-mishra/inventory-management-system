import Navbar from "../../components/layout/Navbar.jsx";
import Button from "../../components/common/Button.jsx";
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../../AuthContext/AuthProvider.jsx";
import {useContext,useState} from "react";
import api from "../../api/axiosClient.js";

export default function LoginPage() {

    const {login}=useContext(AuthContext)
    const [loading,setLoading]=useState(false)

    const navigate=useNavigate()

    async function handleLogin(e){
        e.preventDefault();
        const email=e.target.email.value;
        const password=e.target.password.value;

        setLoading(true);

        try{
            const response=await api.post("/api/auth/authenticate",{
               email,password
            });
                const data=response.data;

                localStorage.setItem("token",data.token);
                localStorage.setItem("role",data.role);
                login(data.token,data.role)
                console.log("Login Successful! Token stored",data);
                navigate("/dashboard");
        }catch(err){
            console.log("Failed : ",err.response ? err.response.data : err.message);
        }finally {
            setLoading(false)
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
                    <Button disabled={loading} type={"submit"}>{loading ? "Logging.." :"Login"}</Button>
                </form>
                <Link to={"/forget-password"}>Forget your password?</Link>
                <p className="auth-switch">
                    Don't have an account? <Link to="/signup">Signup</Link>
                </p>
            </main>
        </section>
    )
}