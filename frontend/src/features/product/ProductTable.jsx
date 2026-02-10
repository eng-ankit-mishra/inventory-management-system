import api from "../../api/axiosClient.js";
import {useContext, useEffect, useState} from "react";
import { MdDelete } from "react-icons/md";
import { FaPencil } from "react-icons/fa6";
import ProductUpdateModals from "./Modal/ProductUpdateModal.jsx";
import {AuthContext} from "../../AuthContext/AuthProvider.jsx";
import QuantityChangeModal from "./Modal/QuantityChangeModal.jsx";

export default function ProductTable({ products }) {
    const [items, setItems] = useState([]);
    const [showUpdateModal,setShowUpdateModal]=useState(false)
    const [showQuantityModal,setShowQuantityModal]=useState(false)
    const {user}=useContext(AuthContext)

    useEffect(() => {
        setItems(products);
    }, [products]);

    async function handleDelete(id) {
        if (!window.confirm("Are you sure you want to delete this product?")) return;

        try {
            await api.delete(`/api/products/${id}`);
            setItems(prev => prev.filter(item => item.id !== id));
        } catch (err) {
            console.error(err);
            alert("Delete Failed.");
        }
    }

    return (
        <table className="product-table">
            <thead>
            <tr>
                <th>S No.</th>
                <th>Product Name</th>
                <th>Sku</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock Level</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
            </thead>

            <tbody>
            {items.map((item,index) => (
                <tr key={item.id} className="table-data">
                    <td>{index+1}</td>
                    <td>{item.name}</td>
                    <td>{item.sku}</td>
                    {/* Handle cases where category is an Object OR a String */}
                    <td>{item.category?.name || item.categoryName || "N/A"}</td>

                    {/* Editable Price Input */}
                    <td>
                        {item.price}
                    </td>

                    {/* Quantity Controls */}
                    <td>
                        <div style={{display: "flex", alignItems: "center", gap: "5px"}}>
                            <button
                                className="qty-btn"
                                onClick={() => setShowQuantityModal(true)}
                                style={{cursor: "pointer", width: "25px", height: "25px"}}
                            >
                                +
                            </button>

                            <span style={{minWidth: "30px", textAlign: "center", fontWeight: "bold"}}>
                                    {item.quantity}
                                </span>

                            <button
                                className="qty-btn"
                                onClick={() => setShowQuantityModal(true)}
                                style={{cursor: "pointer", width: "25px", height: "25px"}}
                            >
                                -
                            </button>
                            {
                                showQuantityModal && <QuantityChangeModal product={item} onClose={()=>setShowQuantityModal(false)}/>
                            }
                        </div>
                    </td>

                    {/* Dynamic Status */}
                    <td>
                            <span style={{
                                color: item.quantity > 10 ? "green" : (item.quantity === 0 ? "red" : "orange"),
                                fontWeight: "600"
                            }}>
                                {item.quantity > 10 ? "In Stock" : (item.quantity === 0 ? "Out of Stock" : "Low Stock")}
                            </span>
                    </td>

                    {/* Action Buttons */}
                    <td>
                        {user.role==="ADMIN" ? (<div  style={{display: "flex", gap: "16px" ,justifyContent:"center",alignItems:"center"}}>
                            <FaPencil style={{cursor:"pointer"}} size={16} onClick={() => setShowUpdateModal(true)}>
                                Update
                            </FaPencil>
                            {
                                showUpdateModal && <ProductUpdateModals product={item} onClose={()=>setShowUpdateModal(false)}/>
                            }

                            <MdDelete
                                style={{cursor:"pointer"}}
                                size={20}
                                onClick={() => handleDelete(item.id)}
                            >
                                Delete
                            </MdDelete>
                        </div>) : <span style={{color:"red"}}>Not Permitted</span>}
                    </td>
                </tr>
            ))}
            </tbody>

        </table>
    );
}