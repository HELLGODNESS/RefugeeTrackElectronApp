import React, { useState, useEffect, Fragment } from "react";
import { useTranslation } from "react-i18next"; // Import useTranslation hook

const DataTable = ({
  tableHeadersData,
  tableBodyData,
  reference,
  onRowClick,
  rowClickEnabled,
  isLoading,
  renderPaginator,
}) => {
  const { t } = useTranslation(); 

  const [tableHeaders, setTableHeaders] = useState(tableHeadersData);
  const [tableBody, setTableBody] = useState(tableBodyData);

  useEffect(() => {
    setTableBody(tableBodyData);
  }, [tableBodyData]);

  useEffect(() => {
    setTableHeaders(tableHeadersData);
  }, [tableHeadersData]);

  function getColumnComponent(id, row) {
    const col = tableHeaders.filter((x) => x.id === id.id)[0];
    return (
      col && (col.component ? col.component(row, setTableBody) : row[id?.id])
    );
  }

  return (
    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8 ">
      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
        <table
          className="min-w-full divide-y divide-gray-300 "
          id="data-table"
        >
          <thead className="bg-gray-50  w-full ">
            <tr>
              {tableHeaders &&
                tableHeaders.map((header, index) => (
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    key={index}
                  >
                    {t(header.label)} {/* Translate label using t function */}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white ">
            {/* <!-- Selected: "bg-gray-50" --> */}
            {!isLoading ? (
              tableBody &&
              tableBody.map((row, index) => (
                <tr key={index}>
                  {tableHeaders &&
                    tableHeaders.map((col, index) => (
                      <Fragment key={index}>
                        {rowClickEnabled ? (
                          <td
                            key={index}
                            onClick={() => onRowClick(row)}
                            className="cursor-pointer whitespace-nowrap px-3 py-2 text-sm text-gray-500"
                          >
                            {getColumnComponent(col, row)}
                          </td>
                        ) : (
                          <>
                            <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">
                              {getColumnComponent(col, row)}
                            </td>
                          </>
                        )}
                      </Fragment>
                    ))}
                </tr>
              ))
            ) : (
              [...Array(8)].map((val, index) => (
                <tr className={` animate-pulse p-2 `} key={index}>
                  <td className="p-2 flex gap-x-4 ml-2 ">
                    <div className="h-4 bg-gray-200 mt-1 mb-1 rounded-lg w-5 border"></div>
                    <div className="h-4 bg-gray-200 mt-1 mb-1 rounded-lg w-[70%]"></div>
                  </td>

                  {tableHeaders &&
                    tableHeaders.map((col, index) => (
                      <td key={index}>
                        <div className="h-4 bg-gray-200 my-1 rounded-md w-[75%]"></div>
                      </td>
                    ))}
                </tr>
              ))
            )}
          </tbody>
          <tbody>
            {tableBody && tableBody?.length === 0 && !isLoading && (
              <Fragment>
                <tr className="bg-gray-100">
                  <td
                    valign="top"
                    colSpan="12"
                    className="dataTables_empty pt-5"
                  >
                    <div
                      align="center"
                      className="text-red-500 align-center justify-center"
                    >
                      <img
                        alt="Empty Table"
                        src="/addnewitem.svg"
                        className="justify-center mx-auto py-5"
                      />
                      <p className="text-success text-bold font-medium text-black p-2">
                        {t("No data available in table.")} {/* Translate text */}
                      </p>
                      <p className="text-success text-sm font-medium text-gray-500 pb-5">
                        {t("Add new record or search with different criteria.")}{" "}
                        {/* Translate text */}
                      </p>
                    </div>
                  </td>
                </tr>
              </Fragment>
            )}
          </tbody>
        </table>
        {renderPaginator?.()}
      </div>
    </div>
  );
};

export default DataTable;

