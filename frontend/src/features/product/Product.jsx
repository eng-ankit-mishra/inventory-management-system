import Navbar from "../../components/layout/Navbar.jsx";
import ProductController from "./ProductController.jsx";
import ProductTable from "./ProductTable.jsx";
import Pagination from "../../components/common/Pagination.jsx";
import { useEffect, useState } from "react";
import api from "../../api/axiosClient.js";

export default function Product() {

    const [products, setProducts] = useState([]);
    const [totalItems, setTotalItems] = useState(0);

    const [pageNo, setPageNo] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState("ALL");
    const [stockStatus, setStockStatus] = useState("ALL");

    const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchTerm);
            setPageNo(0);
        }, 500);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Construct Query Params
                const params = {
                    pageNo: pageNo,
                    pageSize: 8,
                    search: debouncedSearch || undefined,
                    category: category !== "ALL" ? category : undefined,
                    stockStatus: stockStatus !== "ALL" ? stockStatus : undefined
                };

                const response = await api.get("/api/products", { params });

                console.log(response.data)
                setProducts(response.data.content);
                setTotalItems(response.data.totalElements);

            } catch (err) {
                console.error("Failed to load products:", err);
            }
        };

        void fetchProducts();
    }, [pageNo, debouncedSearch, category, stockStatus]);

    const handleCategoryChange = (newCat) => {
        setCategory(newCat);
        setPageNo(0);
    };

    const handleStockChange = (newStatus) => {
        setStockStatus(newStatus);
        setPageNo(0);
    };

    return (
        <section className="product-list">
            <Navbar />
            <h2 className="product-heading">Product List</h2>

            <ProductController
                category={category}
                setCategory={handleCategoryChange}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                stockStatus={stockStatus}
                setStockStatus={handleStockChange}
            />

            <main>
                <ProductTable products={products} />
            </main>

            <Pagination
                currentPage={pageNo}
                itemsPerPage={8}
                totalItems={totalItems}
                onPageChange={setPageNo}
            />
        </section>
    );
}