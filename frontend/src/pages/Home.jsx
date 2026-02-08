import Navbar from '../components/layout/Navbar.jsx'
import Footer from "../components/layout/Footer.jsx";
import Button from "../components/common/Button.jsx";
import {featuresData} from "../features/product/features.js"
import {useNavigate} from "react-router-dom"
import {useContext} from "react";
import {AuthContext} from "../AuthContext/AuthProvider.jsx";

export default function Home(){
    const navigate=useNavigate();

    const {user}=useContext(AuthContext)
    const features=featuresData.map((feature)=>{
        return(
            <div key={feature.id} className={`cards card-${feature.color}`}>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
            </div>
        )
    })

    function handleButton(){
        if(!user){
            navigate("/login")
        }else{
            navigate("/dashboard")

        }
    }
    return(
        <section className="home">
            <Navbar />
            <main className="home-page">
                <h1>Welcome to Inventory management app!</h1>
                <p>Manage Your Inventory with Ease
                    Track products, monitor stock, and analyze
                    data in one secure place.</p>
                <Button onClick={handleButton} style={"secondary"}>Get Started</Button>
            </main>
            <main className="features-page">
                <h2>Why choose us ?</h2>
                <div className="features-section">
                    {features}
                </div>

            </main>
            <Footer/>
        </section>

    )
}