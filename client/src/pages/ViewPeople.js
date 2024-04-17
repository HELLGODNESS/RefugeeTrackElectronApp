import React, { useState, useEffect, Component } from "react";
import axios from "axios";
import SectionHeader from "../components/SectionHeader";
import Dialog from "../components/Dialog";
import DataTable from "../components/DataTable";
import Paginator from "../components/paginator";
import { EyeIcon, IdentificationIcon, PencilIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Modal from "../components/Modal";
import IDCard from "../components/IDCard";

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

export default function ViewPeople() {
  // const dispatch = useDispatch();
  const usersReducer = {}
  // useSelector((state) => state.usersReducer);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);

  const [tableBodyList, setTableBodyList] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [cardModalOpen, setCardModalOpen] = useState(false)

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
    { id: "id", label: "ID" },
    { id: "Name", label: "Name", component: (data) => <>{data.firstName || ''} {data.lastName || ''}</> },
    { id: "maritalStatus", label: "Marital Status", component: (data) => <>{data.maritalStatus || ''} </> },
    { id: "gender", label: "Gender", component: (data) => <>{data.gender || ''} </> },
    { id: "nationality", label: "Nationality", component: (data) => <>{data.nationality || ''} </> },
    { id: "bornIn", label: "Born In", component: (data) => <>{data.bornIn || ''} </> },
    { id: "city", label: "City", component: (data) => <>{data.city || ''} </> },
    { id: "streetAddress", label: "Address", component: (data) => <>{data.streetAddress || ''} </> },
    { id: "pec", label: "Pec", component: (data) => <>{data.pec || ''} </> },
    { id: "bornOn", label: "Born On", component: (data) => <>{data.bornOn || ''} </> },
    { id: "emailAddress", label: "Email" , component: (data) => <>{data.emailAddress || ''} </> } ,
    { id: "cell", label: "Phone" , component: (data) => <>{data.cell || ''}</> },
    {
      id: "Image",
      label: "Image",
      component: (data, setData) => (
        <img
          className="w-16 h-16 rounded-full"
          // src={data.Image}
          src={`http://localhost:4000/file/${data.image && data?.image}`}
          alt="profile"
        />
      ),
    },
    {
      id: "actions",
      label: "",
      component: (data, setData) => (
        <div className="space-x-3 text-right mr-1.5">
          <button
            className=" no-focus"
            title="Delete"
            onClick={(e) => deleteFromTable(data)}
          >
            <EyeIcon className="w-5 h-5" />
          </button>
          <button
            className=" no-focus"
            title="Delete"
            onClick={(e) => setCardModalOpen(data)}
          >
            <IdentificationIcon className="w-5 h-5" />
          </button>
          <button
            className=" no-focus"
            title="Delete"
            onClick={(e) => deleteFromTable(data)}
          >
            <PencilIcon className="w-5 h-5" />
          </button>
          <button
            className=" no-focus"
            title="Delete"
            onClick={(e) => deleteFromTable(data)}
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      ),
    },
  ]);

  useEffect(() => {
    setLoading(true)
    axios.get("http://localhost:4000/person", { params: { page, limit } })
      .then((res) => {
        console.log(res);
        setTableBodyList(res.data.list);
        setCount(res.data.count);
        setLoading(false)
      }).catch((err) => {
        console.log(err);
        setLoading(false)
      });

  }, [limit, page]);

  return (
    <div className="mt-10">
      <SectionHeader title={"All People"}
        mainPage={"People"}
        mainPageLink={"/viewPeople"}
        breadCrumbs={[
          { subPage: "View All People", link: "/viewPeople" }
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
      <Modal isModalOpen={!!cardModalOpen} setModalOpen={setCardModalOpen}>
        <div className='bg-white text-left text-black w-[500px] md:w-[600px] rounded-lg my-8'>
          <div className="border-b flex justify-between items-center px-6 py-4">
            <h4 className="text-base text-gray-900 font-semibold">
              Identity Card
            </h4>
            <XMarkIcon onClick={() => setCardModalOpen(false)} className="w-5 h-5 text-gray-600 cursor-pointer" />
          </div>
          <div className='rounded px-3 py-1 bg-blue-50 flex items-center gap-x-1 m-6 mb-0'>
            <IDCard {...cardModalOpen} />
          </div>

        </div>
      </Modal>
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

