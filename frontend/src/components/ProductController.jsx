import Button from "./Button.jsx";

export default function ProductController() {
    return (
        <main className={"product-controller"}>
            <div className={"product-controller-selector"}>
                <input className={"search"} placeholder={"Search by Name or SKU"}/>
                <select className={"category-selector"}>
                    <option>Filter By Category</option>
                    <option>Electronics</option>
                    <option>TV</option>
                    <option>Mobile</option>
                </select>
                <select className={"stock-selector"}>
                    <option>Stock Status</option>
                    <option>In Stock</option>
                    <option>Low Stock</option>
                    <option>Out of Stock</option>
                </select>
            </div>
            <Button> + New Product</Button>
        </main>
    )
}