import React from "react";
import "./pagination.css";
import usePagination from "./usePagination";

const Pagination = ({
  itemsPerPage,
  totalItems,
  onPageChange,
  currentPage,
}) => {
  const { noOfPages, pagesArr, handleNumber, handleNext, handlePrev } =
    usePagination({ itemsPerPage, totalItems, onPageChange, currentPage });

  return (
    noOfPages > 0 && (
      <nav className="pagination" aria-label="Pagination">
        {/* Previous */}
        {currentPage !== 1 && (
          <button type="button" onClick={handlePrev}>
            Prev
          </button>
        )}
        {pagesArr.length > 0 &&
          pagesArr?.map((row, i) => (
            <button
              type="button"
              key={`pg-${i + 1}`}
              onClick={() => handleNumber(row)}
              {...(currentPage === row && { style: { borderColor: "purple" } })}
            >
              {row}
            </button>
          ))}
        {/* Next */}
        {noOfPages > 1 && currentPage !== noOfPages && (
          <button type="button" onClick={handleNext}>
            Next
          </button>
        )}
      </nav>
    )
  );
};

export default Pagination;
