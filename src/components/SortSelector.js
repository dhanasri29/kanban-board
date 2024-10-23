// src/components/SortSelector.js
import React from "react";

const SortSelector = ({ sortOrder, setSortOrder }) => {
  return (
    <div className="sort-selector">
      <label>Sort By:</label>
      <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
        <option value="priority">Priority</option>
        <option value="title">Title</option>
      </select>
    </div>
  );
};

export default SortSelector;
