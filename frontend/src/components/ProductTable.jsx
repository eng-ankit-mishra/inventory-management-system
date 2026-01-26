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
                    <td>[]</td>
                    <td>{item.productName}</td>
                    <td>{item.sku}</td>
                    <td>{item.category}</td>
                    <td>{item.price}</td>
                    <td>{item.stockLevel}</td>
                    <td>{item.status}</td>
                    <td>Edit</td>
                </tr>
                )
            })}

            </tbody>
        </table>
    )
}