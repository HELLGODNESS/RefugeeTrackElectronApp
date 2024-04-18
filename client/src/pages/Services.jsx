import React, { useState, useEffect, Fragment } from "react";
import DataTable from "../components/DataTable";
import Paginator from "../components/paginator";
import SectionHeader from "../components/SectionHeader";
import Dialog from "../components/Dialog";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useTranslation } from "react-i18next";
import AutoComplete from "../components/AutoComplete";

function Services() {
  const { t, i18n } = useTranslation();
  const [search, setSearch] = useState();
  const [session, setSession] = useState("Cafeteria");
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const usersReducer = {}
  const tableBodyList = usersReducer?.data?.results || [];
  const count = usersReducer?.data?.count || 0;
  const loading = usersReducer?.loading || 0;


  const [state, setState] = useState({
    tableBodyList: [],
    dialogInfo: {
      isOpened: false,
      text: "",
      type: "",
    },
  });


  function deleteFromTable(data) {
    // dispatch(deleteUser(data._id));
  }


  const [tableHeaders, setTableHeaders] = useState([
    { id: "_id", label: "ID" },
    { id: "Name", label: "Name" },
    { id: "Role", label: "Role" },
    { id: "Email", label: "Email" },
    { id: "Phone", label: "Phone" },
    {
      id: "Image",
      label: "Image",
      component: (data, setData) => (
        <img
          className="w-16 h-auto rounded-full"
          src={`${process.env.REACT_APP_ATLAS_URL}/file/${data.Image && data?.Image
            }`}
          alt="profile"
        />
      ),
    },
    {
      id: "actions",
      label: "",
      component: (data, setData) => (
        <div className="flex space-x-3 !text-right">
          <button
            className=" no-focus"
            title="Delete"
            onClick={(e) => deleteFromTable(data)}
          >
            <i
              className="fas fa-times text-[color:var(--primary-color)]"
              aria-hidden="true"
            ></i>
          </button>
        </div>
      ),
    },
  ]);


  return (

    <div className="mt-10">
      <SectionHeader title={"Services"}
        mainPage={"Services"}
        mainPageLink={"/services"}
        tools={() => {
          return <div className="inline-flex  items-center gap-3">
            <select
              id="maritalStatus"
              name="maritalStatus"
              value={session}
              onChange={(e) => setSession(e.target.value)}
              autoComplete="Marital status"
              className="block w-[100%] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset"
            >
              <option value={"Cafeteria"}>{t("Cafeteria")}</option>
              <option value={"Takeaway package"}>{t("Takeaway package")}</option>
              <option value={"Showers"}>{t("Showers")}</option>
              <option value={"Covers"}>{t("Covers")}</option>
              <option value={"Medicines"}>{t("Medicines")}</option>
            </select>

            <button type="button" class="rounded-md  bg-indigo-600 px-3 py-2 text-sm font-semibold text-white whitespace-nowrap shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"> Start Session</button>
          </div>

        }}

      />
      <Dialog
        onFalse={(e) =>
          setState((prevState) => ({
            ...prevState,
            dialogInfo: { isOpened: false, text: "" },
          }))
        }
        onTrue={(e) => deleteFromTable(e)}
        dialogInfo={state.dialogInfo}
      />
      <AutoComplete />
      <DataTable
        isLoading={loading}
        tableHeadersData={tableHeaders}
        setTableHeadersData={setTableHeaders}
        tableBodyData={tableBodyList || []}
        renderPaginator={() => <>
          <Paginator
            page={page}
            setPage={setPage}
            limit={limit}
            setLimit={setLimit}
            total={count}
          /></>} />
    </div>
  );
}

export default Services;
