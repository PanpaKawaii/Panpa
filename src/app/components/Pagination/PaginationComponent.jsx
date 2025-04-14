import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function PaginationComponent({ items, pageSize, Component }) {
    const [CurrentPage, setCurrentPage] = useState(1);

    const { pathname } = useLocation();
    useEffect(() => {
        if (CurrentPage !== 1) setCurrentPage(1);
    }, [pathname]);

    const TotalPages = Math.ceil(items.length / pageSize);
    const StartIndex = (CurrentPage - 1) * pageSize;
    const CurrentItems = items.slice(StartIndex, StartIndex + pageSize);

    const goToPage = (page) => {
        if (page >= 1 && page <= TotalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div>
            <Component ArrayProps={CurrentItems} />

            <div>
                <button onClick={() => goToPage(CurrentPage - 1)}>Previous</button>
                <span>Page {CurrentPage} of {TotalPages}</span>
                <button onClick={() => goToPage(CurrentPage + 1)}>Next</button>
            </div>
        </div>
    )
}