import React, { useState, useEffect, Fragment } from "react";
import DataTable from "../components/DataTable";
import Paginator from "../components/Paginator";
import SectionHeader from "../components/SectionHeader";
import Dialog from "../components/Dialog";

function Services() {

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
      <SectionHeader title={"All Users"}
        mainPage={"Users"}
        mainPageLink={"/admin/viewAllUsers"}
        breadCrumbs={[
          { subPage: "View All Users", link: "/admin/viewAllUsers" }
        ]}

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
