import Navbar from "../../components/layout/Navbar.jsx";
import ProductController from "./ProductController.jsx"
import ProductTable from "./ProductTable.jsx";
import Pagination from "../../components/common/Pagination.jsx";
import { useEffect, useState, useMemo } from "react";

export default function Product() {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState("ALL");
    const [stockStatus, setStockStatus] = useState("ALL");

    // 1. Fetching Data
    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("jwtToken");
            if (!token) return;

            try {
                const response = await fetch("http://localhost:8080/api/products", {
                    headers: { "Authorization": `Bearer ${token}` }
                });
                if (response.ok) {
                    const data = await response.json();
                    setProducts(data);
                }
            } catch (err) {
                console.error("Fetch error:", err);
            }
        };
        fetchData();
    }, []);

    // 2. Compute Filtered Products (useMemo prevents re-calculating on every unrelated render)
    const filteredProducts = useMemo(() => {
        return products.filter(p => {
            // Search filter
            const matchesSearch = searchTerm === "" ||
                p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.sku?.toLowerCase().includes(searchTerm.toLowerCase());

            // Category filter
            const matchesCategory = category === "ALL" || p.category?.name === category;

            // Stock filter
            let matchesStock = true;
            if (stockStatus === "IN_STOCK") matchesStock = p.quantity >= 10;
            else if (stockStatus === "LOW_STOCK") matchesStock = p.quantity > 0 && p.quantity < 10;
            else if (stockStatus === "OUT_OF_STOCK") matchesStock = p.quantity === 0;

            return matchesSearch && matchesCategory && matchesStock;
        });
    }, [products, searchTerm, category, stockStatus]);

    return (
        <section className="product-list">
            <Navbar/>
            <h2 className="product-heading">Product List</h2>
            <ProductController
                category={category}
                setCategory={setCategory}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                setStockStatus={setStockStatus}
                stockStatus={stockStatus}
            />
            <main>
                <ProductTable products={filteredProducts}/>
            </main>
            {/* You'll likely need to pass props here later! */}
            <Pagination totalItems={filteredProducts.length} />
        </section>
    );
}