import { useState } from "react";

function usePagination(data) {
  // Pagination
  const [pageNumber, setPageNumber] = useState(0);
  const cardsPerPage = 20;
  const cardsVisited = pageNumber * cardsPerPage;
  const pageCount = Math.ceil(data.length / cardsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return {
    cardsPerPage,
    cardsVisited,
    pageCount,
    changePage,
  };
}

export default usePagination;
