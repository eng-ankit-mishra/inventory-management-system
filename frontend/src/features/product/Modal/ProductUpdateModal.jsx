import Button from "../../../components/common/Button.jsx";
import {useEffect, useState} from "react";
import api from "../../../api/axiosClient.js";

export default function ProductUpdateModals({ product,onClose }) {


    const [categories,setCategories]=useState([])
    const [currentProduct,setCurrentProduct]=useState(product)

    useEffect(() => {
        async function fetchCategories() {
            const token = localStorage.getItem("token");
            if (!token) return;
            try {
                const response = await api.get("/api/categories")
                    setCategories(response.data);
            } catch(err){
                console.log("Failed : ",err.response ? err.response.data : err.message);
            }
        }
        void fetchCategories();
    }, []);


    function handleChange(e) {
        const { name, value } = e.target;
        setCurrentProduct(prev => ({
            ...prev,
            [name]: value
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            console.log("Sending Payload:", product);

            const response = await api.put(`/api/products/${currentProduct.id}`,{
                    ...currentProduct,
                    price: Number(currentProduct.price),
                    quantity: Number(currentProduct.quantity),
                    categoryName: currentProduct.categoryName
                })
                const data = await response.json();
                console.log("Success:", data);
                onClose();
                window.location.reload();

        } catch(err){
            console.log("Failed : ",err.response ? err.response.data : err.message);
        }
    }

    return (
        <>
            <div className="product-overlay" onClick={onClose}></div>

            <div className="product-modals">
                <form className="product-modals-card" onSubmit={handleSubmit}>
                    <h4>Enter Product Details</h4>

                    <label>Product Name</label>
                    <input name="name" defaultValue={product.name} onChange={handleChange} placeholder="Enter Product Name" required />

                    <label>Product SKU</label>
                    <input name="sku" defaultValue={product.sku} onChange={handleChange} placeholder="Enter Product SKU" required />

                    <label>Product Price</label>
                    <input name="price" defaultValue={product.price} onChange={handleChange} placeholder="Enter Product Price" type="number" required />

                    <label>Product Quantity</label>
                    <input name="quantity" defaultValue={product.quantity} onChange={handleChange} placeholder="Enter Product Quantity" type="number" required />

                    <label>Description</label>
                    <input name="description" defaultValue={product.description} onChange={handleChange} placeholder="Enter Description" />

                    <label>Product Category</label>
                    <div style={{display: 'flex', gap: '5px'}}>
                        <select
                            name="categoryName"
                            defaultValue={product.categoryName}
                            onChange={handleChange}
                            style={{flex: 1}}
                            required
                        >
                            <option value="">Select Category</option>
                            {categories.map(item => (
                                <option key={item.id} value={item.name}>{item.name}</option>
                            ))}
                        </select>
                    </div>

                    <Button type="submit">Update</Button>
                </form>
            </div>
        </>
    );
}