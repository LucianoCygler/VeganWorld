import React from 'react';
import style from "./Pagination.module.css";

export default function Pagination({ goToPrevPage, goToNextPage, goToPage, currentPage, lastPage }) {
    const buttons = [];

    for (let i = 0; i < lastPage; i++) {
        buttons.push(
            <button onClick={() => goToPage(i)}>{i + 1}</button>
        )
    }

    return (
        <div className={style.pagination}>
            <button onClick={goToPrevPage} disabled={currentPage === 0}>←</button>
            {buttons}
            <button onClick={goToNextPage} disabled={currentPage === lastPage - 1}>→</button>
        </div>
    );
};
