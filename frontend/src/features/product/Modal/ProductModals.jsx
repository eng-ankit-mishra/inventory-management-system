import Button from "../../../components/common/Button.jsx";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../AuthContext/AuthProvider.jsx";
import CategoryModal from "./CategoryModal.jsx";
import api from "../../../api/axiosClient.js"; // Fixed import path if needed

export default function ProductModals({ onClose }) {
    const [product, setProduct] = useState({
        name: "",
        sku: "",
        price: "",
        quantity: "",
        description: "",
        categoryName: ""
    });

    const [categories, setCategories] = useState([]);
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        async function fetchCategories() {
            const token = localStorage.getItem("token");
            if (!token) return;
            try {
                const response = await api.get("/api/categories")
                    setCategories(response.data);
            } catch (err) {
                console.error("Error", err);
            }
        }
        void fetchCategories();
    }, []);

    // Handle when a new category is added
    function handleCategoryAdd(newCategory) {
        // 1. Add to list
        setCategories((prev) => [...prev, newCategory]);
        // 2. UX Improvement: Auto-select the new category immediately
        setProduct((prev) => ({ ...prev, categoryName: newCategory.name }));
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setProduct(prev => ({
            ...prev,
            [name]: value
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {

                    await api.post("/api/products", {
                    ...product,
                    price: Number(product.price),
                    quantity: Number(product.quantity),
                    // Ensure this string is sent
                    categoryName: product.categoryName
                })
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
                    <input name="name" value={product.name} onChange={handleChange} placeholder="Enter Product Name" required />

                    <label>Product SKU</label>
                    <input name="sku" value={product.sku} onChange={handleChange} placeholder="Enter Product SKU" required />

                    <label>Product Price</label>
                    <input name="price" value={product.price} onChange={handleChange} placeholder="Enter Product Price" type="number" required />

                    <label>Product Quantity</label>
                    <input name="quantity" value={product.quantity} onChange={handleChange} placeholder="Enter Product Quantity" type="number" required />

                    <label>Description</label>
                    <input name="description" value={product.description} onChange={handleChange} placeholder="Enter Description" />

                    <label>Product Category</label>
                    <div style={{display: 'flex', gap: '5px'}}>
                        <select
                            name="categoryName"
                            value={product.categoryName}
                            onChange={handleChange}
                            style={{flex: 1}}
                            required
                        >

                            <option value="">Select Category</option>
                            {categories.map(item => (
                                <option key={item.id} value={item.name}>{item.name}</option>
                            ))}
                        </select>

                        {user?.role === "ADMIN" && (
                            <Button
                                type="button"
                                onClick={() => setShowCategoryModal(true)}
                                style={"secondary"}
                            >
                                + Category
                            </Button>
                        )}
                    </div>


                    <Button type="submit">Submit</Button>
                </form>
                {showCategoryModal && (
                    <CategoryModal
                        isOpen={showCategoryModal}
                        onCategoryAdded={handleCategoryAdd}
                        onClose={() => setShowCategoryModal(false)}
                    />
                )}
            </div>
        </>
    );
}