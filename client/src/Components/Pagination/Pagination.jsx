import React from "react";
import "./Pagination.css";

const Pagination = ({
  itemsPerPage,
  totalItems,
  currentPage,
  setCurrentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination__container">
      <div className="pagination">
        {pageNumbers.map((number) => (
          <button
            key={number}
            style={{
              backgroundColor: currentPage === number ? "black" : "#4c6fc0",
              color: currentPage === number ? "white" : "white",
              ":hover": {
                backgroundColor: currentPage === number ? "black" : "#4763a5",
              },
              ":active": {
                backgroundColor: currentPage === number ? "black" : "#4c6fc0",
              },
              fontWeight: currentPage === number ? "bold" : "normal",
            }}
            onClick={() => setCurrentPage(number)}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
