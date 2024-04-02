import React, { useState, useEffect } from "react";
import SectionHeader from "../components/SectionHeader";
import Dialog from "../components/Dialog";
import DataTable from "../components/DataTable";
import Paginator from "../components/paginator";

const image = 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
const dummyData = [
  { "_id": "1", "Name": "John Doe", "Role": "Developer", "Email": "john@example.com", "Phone": "+1234567890", "Image": image },
  { "_id": "2", "Name": "Jane Smith", "Role": "Designer", "Email": "jane@example.com", "Phone": "+9876543210", "Image": image },
  { "_id": "3", "Name": "Alice Johnson", "Role": "Manager", "Email": "alice@example.com", "Phone": "+1122334455", "Image": image },
  { "_id": "4", "Name": "Bob Brown", "Role": "Engineer", "Email": "bob@example.com", "Phone": "+9988776655", "Image": image },
  { "_id": "5", "Name": "Eva Wilson", "Role": "Analyst", "Email": "eva@example.com", "Phone": "+5544332211", "Image": image },
  { "_id": "6", "Name": "Michael Johnson", "Role": "Developer", "Email": "michael@example.com", "Phone": "+3322114455", "Image": image },
  { "_id": "7", "Name": "Sarah Miller", "Role": "Designer", "Email": "sarah@example.com", "Phone": "+1122339988", "Image": image },
  { "_id": "8", "Name": "David Lee", "Role": "Manager", "Email": "david@example.com", "Phone": "+9988773322", "Image": image },
  { "_id": "9", "Name": "Emily Brown", "Role": "Engineer", "Email": "emily@example.com", "Phone": "+2233445566", "Image": image },
  { "_id": "10", "Name": "Alex Clark", "Role": "Analyst", "Email": "alex@example.com", "Phone": "+1122334455", "Image": image }
];

export default function Users() {
  // const dispatch = useDispatch();
  const usersReducer = {}
  // useSelector((state) => state.usersReducer);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const tableBodyList = usersReducer?.data?.results || dummyData;
  const count = usersReducer?.data?.count || 0;
  const loading = usersReducer?.loading || 0;

  const [state, setState] = useState({
    tableBodyList: dummyData,
    dialogInfo: {
      isOpened: false,
      text: "",
      type: "",
    },
  });

  const proClickHandler = (data) => {
    // dispatch(updateUserStatus(data._id, { isPro: !data.isPro }));
  };

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
          src={data.Image}
          // src={`${process.env.REACT_APP_ATLAS_URL}/file/${data.Image && data?.Image    }`}
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

  useEffect(() => {
    // dispatch(
    //   getUsers({
    //     page: page + 1,
    //     limit: limit,
    //   })
    // );
  }, [limit, page]);

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

