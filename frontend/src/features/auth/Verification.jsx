import { useSearchParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";

export default function Verification(){
    const [success,setSuccess]=useState("verifying");
    const [searchParams]=useSearchParams()
    const token=searchParams.get("token")

    const hasFired=useRef(false)

    useEffect(() => {

        if(hasFired.current) return;

        hasFired.current=true;


        const validateToken=async ()=>{
            try{
                const response=await fetch(`http://localhost:8080/api/auth/confirm?token=${token}`)
                if(response.ok){
                    setSuccess("success");
                }else{
                    setSuccess("error")
                }
            }catch(err){
                console.error("Error",err)
                setSuccess("error")
            }
        }

        if(token){
            validateToken();
        }
    }, [token]);

    return(
        <div className={"verification"}>
            {success==="verifying" && <p>Verifying your email</p>}
            {success==="success" && <p>Email verified! Please wait for Admin approval</p>}
            {success==="error" && <p>Verification Failed</p>}
        </div>
    )
}