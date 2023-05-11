import React from "react";
import ReactPaginate from "react-paginate";

function Pagination(props) {
  return (
    <ReactPaginate
      previousLabel={"Prev"}
      nextLabel={"Next"}
      pageCount={props.pageCount}
      onPageChange={props.changePage}
      containerClassName={`paginationBttns page-count-${props.pageCount}`}
      previousLinkClassName={"previousBttn"}
      nextLinkClassName={"nextBttn"}
      disabledClassName={"paginationDisabled"}
      activeClassName={"paginationActive"}
    />
  );
}

export default Pagination;
