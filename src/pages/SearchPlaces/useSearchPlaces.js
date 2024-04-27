import { useEffect, useRef, useState } from "react";
import axios from "axios";

let timeoutId;
const defaultPagination = {
  limit: 5,
  totalPages: 0,
  totalCount: 0,
};
const useSearchPlaces = () => {
  const [searchText, setSearchText] = useState("");
  const [paginatedData, setPaginatedData] = useState(null);
  const [page, setPage] = useState(1);
  const [paginationInfo, setPaginationInfo] = useState(defaultPagination);
  const [isLoading, setIsLoading] = useState(false);
  const searchInputRef = useRef(null);

  const handlePagination = (pageNo) => {
    setPage(pageNo);
  };

  const fetchData = (val) => {
    const options = {
      method: "GET",
      url: `https://${process.env.REACT_APP_RAPIDAPI_HOST}/v1/geo/places`,
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
        "X-RapidAPI-Host": process.env.REACT_APP_RAPIDAPI_HOST,
      },
    };
    setIsLoading(true);
    axios
      .get(
        `${options.url}?limit=${
          paginationInfo?.limit
        }&namePrefix=${val}&offset=${paginationInfo?.limit * (page - 1)}`,
        {
          headers: options.headers,
        }
      )
      .then((res) => {
        const { data } = res;
        setPaginationInfo((prev) => ({
          ...prev,
          totalCount: data?.metadata?.totalCount,
          totalPages: data?.metadata?.totalCount / prev?.limit,
        }));
        setPaginatedData(data?.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleChange = (e) => {
    const val = e.target.value;
    setSearchText(val);
  };

  const handleEnter = (event) => {
    if (event.key === "Enter" || event.keyCode === 13) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (searchText && !isLoading) fetchData(searchText);
        else {
          setPaginatedData(null);
          setPaginationInfo(defaultPagination);
        }
      }, 1000);
    }
  };

  const handleSetRecordPerPage = (e) => {
    const val = e.target.value;
    setPaginationInfo((prev) => ({ ...prev, limit: val }));
  };

  useEffect(() => {
    if (searchText) fetchData(searchText);
  }, [page, paginationInfo?.limit]);

  const handleFocusShortcut = (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "/") {
      searchInputRef.current.focus(); // Corrected line
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleFocusShortcut);
  }, []);

  return {
    searchText,
    handleChange,
    paginatedData,
    paginationInfo,
    handlePagination,
    isLoading,
    handleSetRecordPerPage,
    currentPage: page,
    searchInputRef,
    handleEnter,
  };
};

export default useSearchPlaces;
