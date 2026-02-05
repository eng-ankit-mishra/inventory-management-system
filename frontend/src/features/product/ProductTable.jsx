import api from "../../api/axiosClient.js"
import {useEffect, useState} from "react";

export default function ProductTable({products}){


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
                    <td>...</td>
                </tr>
                )
            })}

            </tbody>
        </table>
    )
}