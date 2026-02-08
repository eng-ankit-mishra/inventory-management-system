import api from "../../api/axiosClient.js"
import {useEffect, useState} from "react";
import Button from "../../components/common/Button.jsx";

export default function ProductTable({products}){

    const [modals,setShowModals]=useState(false)


    function handleAction(item){

    }

    return(
        <table className="product-table">
            <thead>
            <tr>
                <th>Checklist</th>
                <th>Product Name</th>
                <th>Sku</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock Level</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
            </thead>

            <tbody>
            {products.map((item)=>{
                return(
                <tr key={item.sku} className={"table-data"}>
                    <td><input type={"checkbox"}/></td>
                    <td>{item.name}</td>
                    <td>{item.sku}</td>
                    <td>{item.category.name}</td>
                    <td>{item.price}</td>
                    <td>{item.quantity}</td>
                    <td>{item.quantity > 10 ? "In Stock" : (item.quantity === 0 ? "Out of Stock" : "Low Stock")}</td>
                    <td><Button onClick={()=>handleAction(item)}>Update</Button></td>
                </tr>
                )
            })}

            </tbody>
        </table>
    )
}