import Navbar from "../../components/layout/Navbar.jsx";
import ProductController from "./ProductController.jsx"
import ProductTable from "./ProductTable.jsx";
import Pagination from "../../components/common/Pagination.jsx";

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