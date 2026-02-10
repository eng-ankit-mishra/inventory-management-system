import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
//import "./Pagination.css"; // Assuming you have styles

export default function Pagination({
                                       totalItems,
                                       itemsPerPage,
                                       currentPage,
                                       onPageChange
                                   }) {
    // 1. Calculate Total Pages
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // 2. Calculate "Showing X-Y of Z"
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    // 3. Generate Page Numbers Array [1, 2, 3...]
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    if (totalItems === 0) return null;

    return (
        <div className="pagination">
            <span>
                Showing {startItem}-{endItem} of {totalItems} Products
            </span>

            <div className="pagination-controls">
                {/* PREV BUTTON */}
                <button
                    className="page-btn"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <FaArrowLeft /> Prev
                </button>

                {/* PAGE NUMBERS */}
                {pageNumbers.map((number) => (
                    <button
                        key={number}
                        className={`page-number ${currentPage === number ? "active" : ""}`}
                        onClick={() => onPageChange(number)}
                    >
                        {number}
                    </button>
                ))}

                {/* NEXT BUTTON */}
                <button
                    className="page-btn"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next <FaArrowRight />
                </button>
            </div>
        </div>
    );
}