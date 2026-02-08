import Navbar from "../../components/layout/Navbar.jsx";
import Button from "../../components/common/Button.jsx";
import {useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";

export default function ResetPassword(){
    const [msg,setMessage]=useState("");
    const [searchParams]=useSearchParams()
    const token=searchParams.get("token")
    const navigate=useNavigate()
    async function handleSubmit(e){
        e.preventDefault()
        const password=e.target.password.value;
        try{
           const response=await fetch(`http://localhost:8080/api/auth/reset-password?token=${token}`,{
               method:"POST",
               headers:{
                   "Content-Type": "application/json"
               },
               body: JSON.stringify({"newPassword":password})
           })
            if(response.ok){
                setMessage("Your password is successfully updated");
                setTimeout(()=>navigate("/login"),2000)
            }else{
                setMessage("Something went wrong!");
            }
        }catch(err){
            console.error("Error",err);
        }
    }
    return(
        <section className={"reset-password"}>
            <Navbar/>
            <main className={"reset-password-card"}>
                <form className={"reset-password-form"} onSubmit={handleSubmit}>
                    <h4>Reset your password</h4>
                    <p>Please provide your new password.</p>
                    <label htmlFor={"password"}>Password: </label>
                    <input id={"password"} name={"password"} type={"password"} placeholder={"Enter your new password"}/>
                    <Button>Submit</Button>
                </form>
                <p>{msg}</p>
            </main>
        </section>
    )
}