import {productData} from "./productData.js"

export default function ProductTable(){
    return(
        <table className="product-table">
            <thead>
            <tr>
                <th>Checklist</th>
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
            {productData.map((item)=>{
                return(
                <tr key={item.id} className={"table-data"}>
                    <td><input type={"checkbox"}/></td>
                    <td>{item.productName}</td>
                    <td>{item.sku}</td>
                    <td>{item.category}</td>
                    <td>{item.price}</td>
                    <td><button className={"btn-action"}>+</button> {item.stockLevel} <button className={"btn-action"}>-</button></td>
                    <td>{item.status}</td>
                    <td>...</td>
                </tr>
                )
            })}

            </tbody>
        </table>
    )
}