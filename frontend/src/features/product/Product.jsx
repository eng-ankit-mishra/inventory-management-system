import Navbar from "../../components/layout/Navbar.jsx";
import ProductController from "./ProductController.jsx"
import ProductTable from "./ProductTable.jsx";
import Pagination from "../../components/common/Pagination.jsx";
import {useEffect, useState} from "react";
import api from "../../api/axiosClient.js";

export default function Product(){
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState("ALL");
    const [stockStatus, setStockStatus] = useState("ALL");


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/api/products");
                setProducts(response.data);
                console.log(response.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        let result = [...products];

        if (searchTerm.trim() !== "") {
            const term = searchTerm.toLowerCase();
            result = result.filter(
                p =>
                    p.name.toLowerCase().includes(term) ||
                    p.sku.toLowerCase().includes(term)
            );
        }

        if (category !== "ALL") {
            result = result.filter(p => p.category.name === category);
        }

        if (stockStatus !== "ALL") {
            result = result.filter(p => {
                if (stockStatus === "IN_STOCK") return p.quantity >= 10;
                if (stockStatus === "LOW_STOCK") return p.quantity > 0 && p.quantity < 10;
                if (stockStatus === "OUT_OF_STOCK") return p.quantity === 0;
                return true;
            });
        }

        setFilteredProducts(result);

    }, [searchTerm, category, stockStatus, products]);


    return (
        <section className="product-list">
            <Navbar AuthRequired={false}/>
            <h2 className={"product-heading"}>Product List</h2>
            <ProductController
                category={category}
                setCategory={setCategory}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                setStockStatus={setStockStatus}
                stockStatus={stockStatus} />
            <main>
                <ProductTable products={filteredProducts}/>
            </main>
            <Pagination/>
        </section>
    )
}