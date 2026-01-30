import Button from "./Button.jsx";

export default function ProductModals({ onClose }) {
    return (
        <>
            <div className="product-overlay" onClick={onClose}></div>

            <div className="product-modals">
                <form
                    className="product-modals-card"
                    onClick={(e) => e.stopPropagation()}
                >
                    <h4>Enter Product Details</h4>
                    <label>Product Name</label>
                    <input placeholder="Enter Product Name" />

                    <label>Product SKU</label>
                    <input placeholder="Enter Product SKU" />

                    <label>Product Category</label>
                    <select>
                        <option>Select Category</option>
                        <option>TV</option>
                        <option>Smartphone</option>
                        <option>Refrigerator</option>
                    </select>

                    <label>Product Price</label>
                    <input placeholder="Enter Product Price" />

                    <label>Product Quantity</label>
                    <input placeholder="Enter Product Quantity" />

                    <Button>Submit</Button>
                </form>
            </div>
        </>
    );
}
