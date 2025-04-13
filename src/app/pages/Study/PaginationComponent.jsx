import React, { useState } from "react";

function PaginationComponent({ items, pageSize }) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(items.length / pageSize);

    const paginate = (array, pageSize, pageNumber) => {
        const start = (pageNumber - 1) * pageSize;
        return array.slice(start, start + pageSize);
    };

    const currentItems = paginate(items, pageSize, currentPage);

    const goToNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    const goToPreviousPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    return (
        <div>
            <h2>Pagination Example</h2>

            {/* Hiển thị các item */}
            <ul>
                {currentItems.map((item, index) => (
                    <li key={index}>{item.Id}</li>
                ))}
            </ul>

            {/* Các nút điều khiển */}
            <div style={{ marginTop: "20px" }}>
                <button onClick={goToPreviousPage} disabled={currentPage === 1}>
                    Previous
                </button>
                <span style={{ margin: "0 10px" }}>
                    Page {currentPage} of {totalPages}
                </span>
                <button onClick={goToNextPage} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default PaginationComponent;