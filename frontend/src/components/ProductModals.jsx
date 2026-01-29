import Button from "./Button.jsx";

export default function ProductModals(){
    return(
        <div>
           <form>
               <label>Product Name</label>
               <input placeholder={"Enter Product Name"}/>
               <label>Product SKU</label>
               <input placeholder={"Enter Product SKU"}/>
               <label>Product Category</label>
               <select>
                   <option>Select Category</option>
                   <option>TV</option>
                   <option>Smartphone</option>
                   <option>Refrigerator</option>
               </select>
               <label>Product Price</label>
               <input placeholder={"Enter Product SKU"}/>
               <label>Product Quantity</label>
               <input placeholder={"Enter Product SKU"}/>
               <Button>Submit</Button>
           </form>
        </div>
    )
}