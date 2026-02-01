import Button from "../../components/common/Button.jsx";
import {useState} from "react";
import ProductModals from "./ProductModals.jsx";

export default function ProductController({searchTerm,category,stockStatus,setSearchTerm,setStockStatus,setCategory}) {
    const [modals,setShowModals]=useState(false);

    return (
        <main className={"product-controller"}>
            <div className={"product-controller-selector"}>
                <input value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} className={"search"} placeholder={"Search by Name or SKU"}/>
                <select value={category} className={"category-selector"} onChange={(e)=>setCategory(e.target.value)}>
                    <option value={"ALL"}>Filter By Category</option>
                    <option value={"Refrigerator"}>Refrigerator</option>
                    <option value={"TV"}>TV</option>
                    <option value={"Smartphone"}>Smartphone</option>
                </select>
                <select value={stockStatus} className={"stock-selector"} onChange={(e)=>setStockStatus(e.target.value)}>
                    <option value={"ALL"}>Stock Status</option>
                    <option value={"IN_STOCK"}>In Stock</option>
                    <option value={"LOW_STOCK"}>Low Stock</option>
                    <option value={"OUT_OF_STOCK"}>Out of Stock</option>
                </select>
            </div>
            <Button onClick={()=>setShowModals(true)}> + New Product</Button>
            {modals && (
                <ProductModals onClose={()=>setShowModals(false)}/>
            )}
        </main>
    )
}