
import React from 'react';
import './Pagination.css'
import { UilAngleLeftB, UilAngleRightB } from '@iconscout/react-unicons'

function Pagination({ currentPagination, recipesPerPagination, totalRecipes, setCurrentPagination, adjustRecipesDisplayBasedOnPagination }) {
    
    const totalPages = Math.ceil(totalRecipes / recipesPerPagination);
    const paginateTo = (nmbr) => {
        setCurrentPagination(nmbr);
        adjustRecipesDisplayBasedOnPagination(nmbr);
    }

    function renderPaginationButtons() {
        const buttons = [];
        let farthestNeighbour;

        for (let i = Math.max(1, currentPagination - 2); i <= Math.min(totalPages, currentPagination + 2); i++) {
            farthestNeighbour = i;
            buttons.push(
                <span
                    key={i}
                    className={`pagination-button ${i === currentPagination ? 'pagination-selected' : ''}`}
                    onClick={() => paginateTo(i)}
                >
                    {i}
                </span>
            );
        }
        if (totalPages - farthestNeighbour > 1) {
            buttons.push(<span key="ellipsis" className='pagination-button'>...</span>);
            buttons.push(
                <span
                    key={totalPages}
                    className={`pagination-button ${totalPages === currentPagination ? 'pagination-selected' : ''}`}
                    onClick={() => paginateTo(totalPages)}
                >
                    {totalPages}
                </span>
            );
        }

        return buttons;
    }

    return (

        <div className='pagination'>
            <span
                className={`pagination-button ${currentPagination - 1 < 1 ? 'disabled' : ''}`}
                onClick={() => currentPagination - 1 < 1 ? '' : paginateTo(currentPagination - 1)}>
                <UilAngleLeftB />
            </span>
            {renderPaginationButtons()}
            <span
                className={`pagination-button ${currentPagination + 1 > totalPages ? 'disabled' : ''}`}
                onClick={() => currentPagination + 1 > totalPages ? '' : paginateTo(currentPagination + 1)}>
                <UilAngleRightB />
            </span>
        </div>
    );
}
export default Pagination;