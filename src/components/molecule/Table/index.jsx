import React from "react";
import Pagination from "../../atoms/Pagination";
import { TABLE_HEADERS } from "../../../constants";
import "./table.css";

const Table = ({
  paginatedData,
  itemsPerPage,
  totalItems,
  handlePagination: onPageChange,
  currentPage,
}) => {
  return (
    <div>
      <table className="table-container">
        <thead>
          <tr>
            {TABLE_HEADERS.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData ? (
            paginatedData?.length > 0 ? (
              paginatedData.map((item, idx) => (
                <tr key={item.id}>
                  <td>{idx + 1}</td>
                  <td>{item.name}</td>
                  <td>
                    <div className="country">
                      <div className="country-img">
                        <img
                          alt="flag"
                          src={`https://flagsapi.com/${item.countryCode}/shiny/64`}
                        />
                      </div>
                      <div>{item.country}</div>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3}>No Results Found</td>
              </tr>
            )
          ) : (
            <tr>
              <td colSpan={3}>Start searching</td>
            </tr>
          )}
        </tbody>
      </table>
      {console.log(totalItems)}
      {totalItems > 0 && (
        <Pagination
          {...{ itemsPerPage, totalItems, onPageChange, currentPage }}
        />
      )}
    </div>
  );
};

export default Table;
