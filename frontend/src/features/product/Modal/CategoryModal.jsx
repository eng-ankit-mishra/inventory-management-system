import { useState } from "react";
import api from "../../../api/axiosClient.js";
export default function CategoryModal({ isOpen, onClose, onCategoryAdded }) {
    const [categoryName, setCategoryName] = useState("");
    const [description, setDescription] = useState("");

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
                await api.post("/api/create-category", {
                    name: categoryName, description })

                onCategoryAdded({ name: categoryName, description }); // Pass data back to parent
                setCategoryName("");
                setDescription("");
                onClose();

        } catch(err){
            console.log("Failed : ",err.response ? err.response.data : err.message);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Add New Category</h3>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Category Name (e.g., Furniture)"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Description (Optional)"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <div className="modal-actions">
                        <button type="button" onClick={onClose} className="btn-cancel">Cancel</button>
                        <button type="submit" className="btn-save">Save Category</button>
                    </div>
                </form>
            </div>
        </div>
    );
}