import Navbar from "../components/Navbar.jsx";
import ProductController from "../components/ProductController.jsx"
import ProductTable from "../components/ProductTable.jsx";
import Pagination from "../components/Pagination.jsx";

export default function Product(){
    return (
        <section className="product-list">
            <Navbar AuthRequired={false}/>
            <h2 className={"product-heading"}>Product List</h2>
            <ProductController/>
            <main>
                <ProductTable/>
            </main>
            <Pagination/>
        </section>
    )
}