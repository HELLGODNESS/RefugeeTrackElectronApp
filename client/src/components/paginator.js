import { useEffect, useState } from "react";

const Paginator = ({ limit = 30, setLimit, page = 0, setPage, total = 30 }) => {
  const [pageNumbers, setPageNumbers] = useState([
    ...Array(Math.ceil(total / limit)),
  ]);

  useEffect(() => {
    setPageNumbers([...Array(Math.ceil(total / limit))]);
  }, [limit, page, total]);

  const pageChangeHandler = (e) => {
    setLimit(e.target.value);
  };

  return (
    <div className="sticky bottom-0 w-[-webkit-fill-available] flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      {/* For Small devices */}
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          type="button"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          onClick={() => page !== 0 && setPage(page - 1)}
        >
          Previous
        </button>
        <button
          type="button"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          onClick={() => page + 1 !== pageNumbers.length && setPage(page + 1)}
        >
          Next
        </button>
      </div>
      {/* For large devices */}
      <div className="hidden sm:flex sm:items-center sm:justify-between w-full">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{page * limit + 1}</span> -{" "}
            <span className="font-medium">
              {page + 1 !== pageNumbers.length ? page * limit + limit : total}{" "}
            </span>{" "}
            of <span className="font-medium">{total}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex rounded-md w-full"
            aria-label="Pagination"
          >
            <div className="relative inline-flex items-center gap-2 mr-4">
              <span className="text-sm font-medium text-gray-500">
                Rows per page:
              </span>
              <select
                id="countries"
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none "
                onChange={pageChangeHandler}
                defaultValue={limit}
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="125">125</option>
                <option value="150">150</option>
                <option value="175">175</option>
                <option value="200">200</option>
              </select>


            </div>
            <button
              type="button"
              className={`${
                page <= 0 ? "cursor-not-allowed" : "cursor-pointer"
              } relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20`}
              onClick={() => page !== 0 && setPage(page - 1)}
            >
              <span className="">Previous</span>
            </button>
            {pageNumbers &&
              pageNumbers.map((currentPage, index) => {
                return (
                  <button
                    key={index}
                    type="button"
                    className={`cursor-pointer relative z-10 inline-flex items-center border ${
                      index === page
                      ? "border-blue-500 text-blue-600 bg-blue-50 !cursor-not-allowed"
                      : "border-gray-300 text-gray-500 bg-white hover:bg-gray-50"
                    } px-4 py-2 text-sm font-medium focus:z-20`}
                    onClick={() => page !== index && setPage(index)}
                  >
                    {index + 1}
                  </button>
                );
              })}
            <button
              type="button"
              onClick={() =>
                page + 1 !== pageNumbers.length && setPage(page + 1)
              }
              className={`${
                page + 1 !== pageNumbers.length
                  ? "cursor-pointer"
                  : "cursor-not-allowed"
              } relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20`}
            >
              <span className="">Next</span>
              {/* <ChevronRightIcon className="h-5 w-5" aria-hidden="true" /> */}
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Paginator;
