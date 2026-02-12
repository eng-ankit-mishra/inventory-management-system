import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

export default function Pagination({
                                       totalItems,
                                       itemsPerPage = 8,
                                       currentPage, // <--- 1. NEW PROP: Receive current page from parent
                                       onPageChange,
                                   }) {
    // 2. REMOVED internal useState. We rely entirely on props.

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Logic checks remain the same
    const startItem = currentPage * itemsPerPage + 1;
    const endItem = Math.min((currentPage + 1) * itemsPerPage, totalItems);

    const pageNumbers = [];
    for (let i = 0; i < totalPages; i++) {
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
                    // 3. Just call the prop function. No local state to update.
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 0}
                >
                    <FaArrowLeft /> Prev
                </button>

                {/* NUMBER BUTTONS */}
                {pageNumbers.map((number) => (
                    <button
                        key={number}
                        // 4. Use the prop to check active state
                        className={`page-number ${currentPage === number ? "active" : ""}`}
                        onClick={() => onPageChange(number)}
                    >
                        {/* 5. Display (number + 1) so users see "1" instead of "0" */}
                        {number + 1}
                    </button>
                ))}

                {/* NEXT BUTTON */}
                <button
                    className="page-btn"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages - 1}
                >
                    Next <FaArrowRight />
                </button>
            </div>
        </div>
    );
}