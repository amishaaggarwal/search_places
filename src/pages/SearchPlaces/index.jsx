import React from "react";
import useSearchPlaces from "./useSearchPlaces";
import SearchField from "../../components/atoms/SearchField";
import { PLACEHOLDER } from "../../constants";
import Table from "../../components/molecule/Table";

const SearchPlaces = () => {
  const {
    searchText,
    handleChange,
    paginatedData,
    paginationInfo,
    handlePagination,
    isLoading,
    handleSetRecordPerPage,
    currentPage,
    searchInputRef,
    handleEnter,
  } = useSearchPlaces();

  return (
    <div className="parent-div">
      <SearchField
        searchText={searchText}
        handleChange={handleChange}
        placeholder={PLACEHOLDER}
        isLoading={isLoading}
        handleSetRecordPerPage={handleSetRecordPerPage}
        limit={paginationInfo?.limit}
        searchInputRef={searchInputRef}
        handleEnter={handleEnter}
      />
      <Table
        {...{
          paginatedData,
          itemsPerPage: paginationInfo?.limit,
          totalItems: paginationInfo?.totalCount,
          handlePagination,
          currentPage,
        }}
      />
    </div>
  );
};

export default SearchPlaces;
