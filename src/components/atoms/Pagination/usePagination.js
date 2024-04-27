import React, { useEffect, useState } from "react";

const range = (start, end) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};
const DOTS = "...";

const usePagination = ({
  itemsPerPage: recordPerPage,
  totalItems: count,
  onPageChange: setCurrentPage,
  currentPage,
}) => {
  const [pagesArr, setPagesArr] = useState([]);
  const [siblingCount, setSiblingCount] = useState(1);
  const perPageRecord = recordPerPage || 10;
  const noOfPages =
    count && (count > perPageRecord ? Math.ceil(count / perPageRecord) : 0);

  const fetchPages = () => {
    let pageRange = [];

    // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    const totalPageNumbers = siblingCount + 5;
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, noOfPages);
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < noOfPages - 2;

    /*
      Case 1: No dots
      Case 2: Only right dots
      Case 3: Only left dots
      Case 4: Both left and right dots 
    */
    if (totalPageNumbers >= noOfPages) {
      pageRange = range(1, noOfPages);
    } else if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);
      pageRange = [...leftRange, DOTS, noOfPages];
    } else if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(noOfPages - rightItemCount + 1, noOfPages);
      pageRange = [1, DOTS, ...rightRange];
    } else {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      pageRange = [1, DOTS, ...middleRange, DOTS, noOfPages];
    }
    setPagesArr(pageRange);
  };

  const handleNumber = (row) => {
    if (Number.isInteger(row)) setCurrentPage(row);
  };

  const handleResize = () => {
    setSiblingCount(
      window.innerWidth < 350 ||
        (window.innerWidth > 768 && window.innerWidth < 850)
        ? 0
        : 1
    );
  };

  const handleNext = () => setCurrentPage(currentPage + 1);
  const handlePrev = () => setCurrentPage(currentPage - 1);

  useEffect(() => {
    fetchPages();
  }, [perPageRecord, count, currentPage, siblingCount]);

  useEffect(() => {
    handleResize(); // set initial background color on mount

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { noOfPages, pagesArr, handleNumber, handleNext, handlePrev };
};

export default usePagination;
