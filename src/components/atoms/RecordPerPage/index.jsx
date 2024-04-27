import React from "react";
import "./recordPerPage.css";

const RecordPerPage = ({ handleSetRecordPerPage, limit }) => {
  return (
    <div className="select-container">
      <select value={limit} onChange={handleSetRecordPerPage}>
        <option value="5">5</option>
        <option value="10">10</option>
      </select>
    </div>
  );
};

export default RecordPerPage;
