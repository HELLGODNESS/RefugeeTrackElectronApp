import React, { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import axios from "axios";
import SectionHeader from "../components/SectionHeader";
import Dialog from "../components/Dialog";
import DataTable from "../components/DataTable";
import Paginator from "../components/paginator";
import {
  EyeIcon,
  IdentificationIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Modal from "../components/Modal";
import IDCard from "../components/IDCard";
import UserData from "../components/UserData";

const image =
  "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";
const dummyData = [
  {
    _id: "1",
    Name: "John Doe",
    Role: "Developer",
    Email: "john@example.com",
    Phone: "+1234567890",
    Image: image,
  },
  {
    _id: "2",
    Name: "Jane Smith",
    Role: "Designer",
    Email: "jane@example.com",
    Phone: "+9876543210",
    Image: image,
  },
  {
    _id: "3",
    Name: "Alice Johnson",
    Role: "Manager",
    Email: "alice@example.com",
    Phone: "+1122334455",
    Image: image,
  },
  {
    _id: "4",
    Name: "Bob Brown",
    Role: "Engineer",
    Email: "bob@example.com",
    Phone: "+9988776655",
    Image: image,
  },
  {
    _id: "5",
    Name: "Eva Wilson",
    Role: "Analyst",
    Email: "eva@example.com",
    Phone: "+5544332211",
    Image: image,
  },
  {
    _id: "6",
    Name: "Michael Johnson",
    Role: "Developer",
    Email: "michael@example.com",
    Phone: "+3322114455",
    Image: image,
  },
  {
    _id: "7",
    Name: "Sarah Miller",
    Role: "Designer",
    Email: "sarah@example.com",
    Phone: "+1122339988",
    Image: image,
  },
  {
    _id: "8",
    Name: "David Lee",
    Role: "Manager",
    Email: "david@example.com",
    Phone: "+9988773322",
    Image: image,
  },
  {
    _id: "9",
    Name: "Emily Brown",
    Role: "Engineer",
    Email: "emily@example.com",
    Phone: "+2233445566",
    Image: image,
  },
  {
    _id: "10",
    Name: "Alex Clark",
    Role: "Analyst",
    Email: "alex@example.com",
    Phone: "+1122334455",
    Image: image,
  },
];

export default function ViewPeople() {
  // const dispatch = useDispatch();
  const usersReducer = {};
  // useSelector((state) => state.usersReducer);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const identityCardRef = useRef(null);
  const [tableBodyList, setTableBodyList] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [cardModalOpen, setCardModalOpen] = useState(false);
  const [peopleData, setpeopleData] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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
    // { id: "maritalStatus", label: "Marital Status", component: (data) => <>{data.maritalStatus || ''} </> },
    { id: "gender", label: "Gender", component: (data) => <>{data.gender || ''} </> },
    // { id: "nationality", label: "Nationality", component: (data) => <>{data.nationality || ''} </> },
    { id: "bornIn", label: "Born In", component: (data) => <>{data.bornIn || ''} </> },
    { id: "city", label: "City", component: (data) => <>{data.city || ''} </> },
    // { id: "streetAddress", label: "Address", component: (data) => <>{data.streetAddress || ''} </> },
    // { id: "pec", label: "Pec", component: (data) => <>{data.pec || ''} </> },
    // { id: "bornOn", label: "Born On", component: (data) => <>{data.bornOn || ''} </> },
    { id: "emailAddress", label: "Email", component: (data) => <>{data.emailAddress || ''} </> },
    { id: "cell", label: "Phone", component: (data) => <>{data.cell || ''}</> },
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
            title="User Data"
            onClick={(e) => setpeopleData(data)}
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
    setLoading(true);
    axios
      .get("http://localhost:4000/person", {
        params: { page, limit, searchQuery },
      }) // Pass searchQuery to API call
      .then((res) => {
        setTableBodyList(res.data.list);
        setCount(res.data.count);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [limit, page, searchQuery]);

  const handleSearchInputChange = (e) => {
    console.log(e.target.value);
    setSearchQuery(e.target.value);
  };

  const handlePrint = () => {
    if (!identityCardRef.current) {
      console.error("Identity card element not found.");
      return;
    }

    // Use html2canvas to capture the card modal content
    html2canvas(identityCardRef.current)
      .then((canvas) => {
        const imageUrl = canvas.toDataURL(); // Convert canvas to image URL

        // Create a new window to print the card
        const printWindow = window.open();
        printWindow.document.write('<img src="' + imageUrl + '" />');
        printWindow.document.close();
        printWindow.print(); // Trigger the print dialog
      })
      .catch((error) => {
        console.error("Error capturing card modal:", error);
      });
  };

  return (
    <div className="mt-10">
      <SectionHeader
        title={"All People"}
        mainPage={"People"}
        mainPageLink={"/viewPeople"}
        breadCrumbs={[{ subPage: "View All People", link: "/viewPeople" }]}
      />

      <input
        type="text"
        placeholder="Search by name..."
        value={searchQuery}
        onChange={handleSearchInputChange}
        className="border border-gray-300 rounded-md px-3 py-1 w-full max-w-[15rem] mb-4 ml-10" // Add left padding to accommodate the icon
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
        <div className="bg-white text-left text-black w-[500px] md:w-[500px] rounded-lg my-8">
          <div className="border-b flex justify-between items-center px-6 py-4">
            <h4 className="text-base text-gray-900 font-semibold">
              Identity Card
            </h4>
            <XMarkIcon
              onClick={() => setCardModalOpen(false)}
              className="w-5 h-5 text-gray-600 cursor-pointer"
            />
          </div>
          <div
            ref={identityCardRef}
            className="rounded px-3 py-1 bg-blue-50 flex items-center gap-x-1 m-6 mb-0 pl-[8rem]"
          >
            <IDCard {...cardModalOpen} />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-8 h-8 cursor-pointer mt-[19rem]"
              onClick={handlePrint}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z"
              />
            </svg>
          </div>
        </div>
      </Modal>

      <Modal isModalOpen={!!peopleData} setModalOpen={setpeopleData}>
        <div className="bg-white text-left text-black w-[600px] md:w-[700px] rounded-lg my-8">
          <div className="border-b flex justify-between items-center px-6 py-4">
            <h4 className="text-base text-gray-900 font-semibold">User Data</h4>
            <XMarkIcon
              onClick={() => setpeopleData(false)}
              className="w-5 h-5 text-gray-600 cursor-pointer"
            />
          </div>
          <div className="rounded px-3 py-1 bg-blue-50 flex items-center gap-x-1 m-6 mb-0 ">
            <UserData {...peopleData} />
          </div>
        </div>
      </Modal>

      <DataTable
        isLoading={loading}
        tableHeadersData={tableHeaders}
        setTableHeadersData={setTableHeaders}
        tableBodyData={tableBodyList || []}
        renderPaginator={() => (
          <>
            <Paginator
              page={page}
              setPage={setPage}
              limit={limit}
              setLimit={setLimit}
              total={count}
            />
          </>
        )}
      />
    </div>
  );
}
