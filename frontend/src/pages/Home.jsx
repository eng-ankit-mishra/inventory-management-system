import Navbar from '../components/Navbar.jsx'
import Footer from "../components/Footer.jsx";
import Button from "../components/Button.jsx";
import {featuresData} from "../components/features.js"

export default function Home(){
    const features=featuresData.map((feature)=>{
        return(
            <div key={feature.id} className={`cards card-${feature.color}`}>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
            </div>
        )
    })
    return(
        <section className="home">
            <Navbar />
            <main className="home-page">
                <h1>Welcome to Inventory management app!</h1>
                <p>Manage Your Inventory with Ease
                    Track products, monitor stock, and analyze
                    data in one secure place.</p>
                <Button type={"secondary"}>Get Started</Button>
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