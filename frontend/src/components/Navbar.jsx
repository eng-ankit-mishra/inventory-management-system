import Button from './Button.jsx'
export default function Navbar({AuthRequired=true}){
    return (
        <nav className="navbar">
            <h2><a>InventoryApp</a></h2>
            {AuthRequired && <Button>Login / Register</Button>}
        </nav>
    )
}