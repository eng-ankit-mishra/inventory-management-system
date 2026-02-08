import Navbar from "../components/layout/Navbar.jsx";
import {useNavigate} from "react-router-dom"
import {useEffect, useState} from "react";

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
            try{
                const response = await fetch("http://localhost:8080/api/products/getSummary",{
                    method:"GET",
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setProduct(data);
                    console.log(data)
                } else {
                    console.error("Failed:", response.status);
                }

            }catch(err){
                console.error("Error",err);
            }
        }
        fetchProduct();
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