import Button from "./Button.jsx";

export default function Pagination(){
    return(
        <div className="pagination">
            <span>Showing 1-10 of 50 Products</span>
            <span><Button>Prev</Button>1 2 3<Button>Next</Button></span>
        </div>
    )
}