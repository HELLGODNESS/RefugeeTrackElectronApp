import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Fragment, useRef, useEffect, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'

const Paginator = ({ limit = 20, setLimit, page = 0, setPage, total = 20 }) => {

  const [pageNumbers, setPageNumbers] = useState([...Array(Math.ceil(total / limit)).slice(0, 10)])
  const [totalPages, setTotalPages] = useState(Array(Math.ceil(total / limit)).length)

  const paginationRef = useRef(null);

  useEffect(() => {
    const pages = Array(Math.ceil(total / limit)).fill(0).map((item, index) => index);
    const intervalCount = 2;

    let maxInterval = 0
    let minInterval = 0

    if (page < intervalCount) {
      maxInterval = intervalCount - page
    }
    if (page + intervalCount > pages.length) {
      minInterval = pages.length - page === 1 ? intervalCount - 1 : intervalCount - (pages.length - page);
    }
    const minPage = page - (intervalCount + minInterval) >= 0 ? page - (intervalCount + minInterval) : 0;
    const maxPage = page + maxInterval + intervalCount > (pages.length) ? pages.length : page + maxInterval + intervalCount

    let firstPageOption = [];
    let lastPageOption = [];
    const lastPage = pages.length - 1

    if (minPage > 0) {
      firstPageOption = [0, ".", "."]
    }
    if (maxPage <= lastPage) {
      lastPageOption = [".", ".", lastPage]
    }

    setPageNumbers([...firstPageOption, ...pages.slice(minPage, maxPage), ...lastPageOption])
    setTotalPages(pages.length)

  }, [limit, page, total])

  useEffect(() => {
    if (page >= totalPages) {
      setPage(0)
    }
  }, [page, totalPages])

  const handleLimitChange = (limitValue) => {
    if (limit !== limitValue) {
      setLimit(limitValue);
      setPage(0);
    }
  }

  return (
    <div className={`$z-[12] flex items-center justify-between border-t border-gray-200 bg-white`}>
      <div className="flex flex-1 justify-between sm:hidden px-4 py-3 sm:px-6 bg-white">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>

      <div ref={paginationRef} className={`z-[12] hidden w-full border-t sm:flex sm:flex-1 sm:items-center sm:justify-between px-4 py-3 sm:px-6`}>
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{((page) * limit) + 1}</span> - <span className="font-medium">
              {page + 1 !== Math.ceil(total / limit) ? ((page) * limit) + limit : total} </span> of{" "}
            <span className="font-medium">{total}</span> results
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex  rounded-md" aria-label="Pagination">
            <div className="relative inline-flex items-center">
              <span className="text-sm font-normal text-gray-800">Rows per page:</span>


              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex justify-center items-center rounded-lg border ml-2 mr-4 border-gray-300 bg-white p-2 text-xs font-medium text-gray-700  hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                    {limit}
                    <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute left-3 bottom-10  z-[12]  w-fit  origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none cursor-pointer">
                    <div className="py-1">

                      <Menu.Item>
                        {({ active }) => (
                          <div onClick={() => handleLimitChange(5)} className={`${active ? 'bg-gray-100' : 'bg-white'} px-4`}>
                            5
                          </div>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <div onClick={() => handleLimitChange(10)} className={`${active ? 'bg-gray-100' : 'bg-white'} px-4`}>
                            10
                          </div>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <div onClick={() => handleLimitChange(20)} className={`${active ? 'bg-gray-100' : 'bg-white'} px-4`}>
                            20
                          </div>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <div onClick={() => handleLimitChange(50)} className={`${active ? 'bg-gray-100' : 'bg-white'} px-4`}>
                            50
                          </div>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <div onClick={() => handleLimitChange(100)} className={`${active ? 'bg-gray-100' : 'bg-white'} px-4`}>
                            100
                          </div>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
            <div
              onClick={() => page !== 0 && setPage(page - 1)}
              className={`${page <= 0 ? 'cursor-not-allowed' : 'cursor-pointer'} relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20`}
            >
              <span className="">Previous</span>
            </div>
            {pageNumbers && pageNumbers.map((currentPage, index) => {
              return (
                <a
                  onClick={() => page !== currentPage && currentPage !== "." && setPage(currentPage)}
                  className={`${currentPage === "." ? "cursor-not-allowed px-1 py-1" : "cursor-pointer border px-4 py-2"}  relative z-[12] inline-flex items-center  ${currentPage === page ? 'border-blue-500 text-blue-600 bg-blue-50 !cursor-not-allowed' : 'border-gray-300 text-gray-500 bg-white hover:bg-gray-50'}  text-sm font-medium focus:z-20`}
                >
                  {currentPage !== "." ? (currentPage || 0) + 1 : currentPage}
                </a>
              )
            })}
            <div
              onClick={() => page + 1 !== totalPages && totalPages !== 0 && setPage(page + 1)}
              className={`${(page + 1 !== totalPages && totalPages !== 0) ? 'cursor-pointer' : 'cursor-not-allowed'} relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20`}

            >
              <span className="">Next</span>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Paginator;
