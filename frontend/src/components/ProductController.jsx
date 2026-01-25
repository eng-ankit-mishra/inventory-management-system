import Button from "./Button.jsx";

export default function ProductController() {
    return (
        <main className={"product-controller"}>
            <div className={"product-controller-selector"}>
                <input placeholder={"Search by Name or SKU"}/>
                <span>Filter by Category</span>
                <span>Stock Status</span>
            </div>
            <Button> + New Product</Button>
        </main>
    )
}