import Button from "../../components/common/Button.jsx";
import {useState} from "react";
import api from "../../api/axiosClient.js";

export default function ProductModals({ onClose }) {
     const [product,setProduct]=useState({
         name: "",
         sku: "",
         price: "",
         quantity: "",
         description: "",
         categoryId: ""
     })

    function handleChange(e){
        const {name,value}=e.target;
        setProduct(prev => ({
            ...prev,
            [name]:value
        }));

    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await api.post("/api/products", {
                ...product,
                price: Number(product.price),
                quantity: Number(product.quantity),
                categoryId: Number(product.categoryId),
            });
            console.log(response.data);
            onClose();
        } catch (err) {
            console.error(err);
        }
    }


    return (
        <>
            <div className="product-overlay" onClick={onClose}></div>

            <div className="product-modals">
                <form
                    className="product-modals-card"
                    onSubmit={handleSubmit}
                >
                    <h4>Enter Product Details</h4>
                    <label>Product Name</label>
                    <input name={"name"} value={product.name} onChange={handleChange} placeholder="Enter Product Name" />

                    <label>Product SKU</label>
                    <input name={"sku"} value={product.sku} onChange={handleChange} placeholder="Enter Product SKU" />

                    <label>Product Price</label>
                    <input name={"price"} value={product.price} onChange={handleChange} placeholder="Enter Product Price" />

                    <label>Product Quantity</label>
                    <input name={"quantity"} value={product.quantity} onChange={handleChange} placeholder="Enter Product Quantity" />

                    <label>Product Description</label>
                    <input name={"description"} value={product.description} onChange={handleChange} placeholder="Enter Product Quantity" />

                    <label>Product Category</label>
                    <select name={"categoryId"} value={product.categoryId} onChange={handleChange}>
                        <option value={""}>Select Category</option>
                        <option value={1}>TV</option>
                        <option value={2}>Smartphone</option>
                        <option value={3}>Refrigerator</option>
                    </select>

                    <Button type={"submit"}>Submit</Button>
                </form>
            </div>
        </>
    );
}
