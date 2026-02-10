import { useState } from "react";
export default function CategoryModal({ isOpen, onClose, onCategoryAdded }) {
    const [categoryName, setCategoryName] = useState("");
    const [description, setDescription] = useState("");

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/api/create-category", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({ name: categoryName, description })
            });

            if (response.ok) {
                onCategoryAdded({ name: categoryName, description }); // Pass data back to parent
                setCategoryName("");
                setDescription("");
                onClose();
            } else {
                alert("Failed to add category");
            }
        } catch (error) {
            console.error("Error:", error);
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