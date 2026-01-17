import Button from './Button.jsx'
export default function Navbar(){
    return (
        <nav className="navbar">
            <h2 className={"nav-heading"}>InventoryApp</h2>
            <Button>Login / Register</Button>
        </nav>
    )
}