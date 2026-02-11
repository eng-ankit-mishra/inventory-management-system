import Button from "../../../components/common/Button.jsx";
import api from "../../../api/axiosClient.js";

export default function QuantityChangeModal({product,onClose}){
    async function handleSubmit(e) {
        e.preventDefault()
        const qty=Number(e.target.quantity.value);

        try {
            await api.patch(`/api/products/${product.id}/quantity?qty=${qty}`);
            window.location.reload()
            onClose();
        } catch(err){
            console.log("Failed : ",err.response ? err.response.data : err.message);
        }
    }
    return(
        <div>
            <div className="product-overlay" onClick={onClose}></div>
            <div className="product-modals">
                <form onSubmit={handleSubmit} className="product-modals-card">
                    <label htmlFor={"name"}>Product Name</label>
                    <input id={"name"} name={"name"} type={"text"} value={product.name} readOnly={true}/>
                    <label>Quantity</label>
                    <input id={"name"} name={"quantity"} defaultValue={product.quantity} onChange={(e)=>e.target.value} />
                    <Button type={"submit"}>Update</Button>
                </form>
            </div>

        </div>

    )
}