import Button from "./Button.jsx";
import {useState} from "react";
import ProductModals from "./ProductModals.jsx";

export default function ProductController() {
    const [modals,setShowmodals]=useState(false)

    return (
        <main className={"product-controller"}>
            <div className={"product-controller-selector"}>
                <input className={"search"} placeholder={"Search by Name or SKU"}/>
                <select className={"category-selector"}>
                    <option>Filter By Category</option>
                    <option>Electronics</option>
                    <option>TV</option>
                    <option>Mobile</option>
                </select>
                <select className={"stock-selector"}>
                    <option>Stock Status</option>
                    <option>In Stock</option>
                    <option>Low Stock</option>
                    <option>Out of Stock</option>
                </select>
            </div>
            <Button onClick={()=>setShowmodals(true)}> + New Product</Button>
            {modals && (
                <ProductModals onClose={()=>setShowmodals(false)}/>
            )}
        </main>
    )
}