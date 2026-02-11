import Navbar from "../components/layout/Navbar.jsx";
import {useNavigate} from "react-router-dom"
import {useEffect, useState} from "react";
import api from "../api/axiosClient.js"

export default function Dashboard() {

    const navigate=useNavigate();
    const [product,setProduct]=useState({
        totalProducts: 0,
        totalPrice: 0,
        lowStock: 0
    });

    useEffect(() => {
        const fetchProduct= async ()=>{
            const token=localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }
            try {
                const response = await api.get("/api/products/getSummary");
                const data = response.data;
                setProduct(data);
                console.log(data);

            } catch (error) {
                console.error("Failed:", error.response ? error.response.status : error.message);
            }
        }
        void fetchProduct();
    }, []);


    const productDetails=[{
        id:1,
        title: 'Total Products',
        description:product.totalProducts,
        color:"red"
    },
        {
            id:2,
            title: 'Total Value',
            description:product.totalPrice,
            color:"blue"
        },{
            id:3,
            title: 'Low Stock',
            description:product.lowStock,
            color:"green"
        }]

    const productDetailsCard=productDetails.map((item)=>{
        return (
            <div onClick={()=>navigate("/products")} key={item.id} className={`dashboard-card card-${item.color}`}>
                <h3 className={"product-card-heading"}>{item.title}</h3>
                <p className={"product-card-desc"}>{item.description}</p>
            </div>
        )
    })
    return(
        <section className={"dashboard"}>
            <Navbar/>
            <h2>Dashboard</h2>
            <main className={"dashboard-main"}>
                {productDetailsCard}
            </main>
        </section>
    )
}