import Button from './Button.jsx'
import {Link, useNavigate} from "react-router-dom";
export default function Navbar({AuthRequired=true}){
    const navigate=useNavigate();
    return (
        <nav className="navbar">
            <h2><Link to={"/"} className={"app-name"}>InventoryApp</Link></h2>
            {AuthRequired && <Button onClick={()=>navigate("/login")}>Login / Register</Button>}
        </nav>
    )
}