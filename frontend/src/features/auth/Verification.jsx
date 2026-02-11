import { useSearchParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import api from "../../api/axiosClient.js";

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
                    await api.get(`/api/auth/confirm?token=${token}`)
                    setSuccess("success");

            }catch(err){
                setSuccess("error")
                console.log("Failed : ",err.response ? err.response.data : err.message);
            }
        }

        if(token){
            void validateToken();
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