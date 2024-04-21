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
  PrinterIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Modal from "../components/Modal";
import IDCard from "../components/IDCard";
import UserData from "../components/UserData";
import { useTranslation } from "react-i18next";

export default function ViewPeople() {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const identityCardRef = useRef(null);
  const [tableBodyList, setTableBodyList] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [cardModalOpen, setCardModalOpen] = useState(false);
  const [peopleData, setPeopleData] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { t, i18n } = useTranslation();

  const [state, setState] = useState({
    tableBodyList: tableBodyList,
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
    {
      id: "Name",
      label: t("Name"),
      component: (data) => (
        <>
          {data.firstName || ""} {data.lastName || ""}
        </>
      ),
    },
    // { id: "maritalStatus", label: "Marital Status", component: (data) => <>{data.maritalStatus || ''} </> },
    {
      id: "gender",
      label: t("Gender"),
      component: (data) => <>{data.gender || ""} </>,
    },
    // { id: "nationality", label: "Nationality", component: (data) => <>{data.nationality || ''} </> },
    {
      id: "bornIn",
      label: t("Born in"),
      component: (data) => <>{data.bornIn || ""} </>,
    },
    {
      id: "city",
      label: t("City"),
      component: (data) => <>{data.city || ""} </>,
    },
    // { id: "streetAddress", label: "Address", component: (data) => <>{data.streetAddress || ''} </> },
    // { id: "pec", label: "Pec", component: (data) => <>{data.pec || ''} </> },
    // { id: "bornOn", label: "Born On", component: (data) => <>{data.bornOn || ''} </> },
    {
      id: "emailAddress",
      label: "Email",
      component: (data) => <>{data.emailAddress || ""} </>,
    },
    {
      id: "cell",
      label: t("Mobile phone"),
      component: (data) => <>{data.cell || ""}</>,
    },
    {
      id: "Image",
      label: t("Photo"),
      component: (data, setData) => (
        <img
          className="w-16 h-16 rounded-full"
          // src={data.Image}
          src={
            data.image ? `http://localhost:4000/file/${data.image}` : "user.png"
          }
          alt="profile"
        />
      ),
    },
    {
      id: "actions",
      label: "",
      component: (data, setData) => (
        <div className="space-x-1.5 text-right mr-1.5">
          <button
            className=" no-focus"
            title="User Data"
            onClick={(e) => setPeopleData(data)}
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
        params: { page, limit, search: searchQuery },
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
        title={t("All People")}
        mainPage={"People"}
        mainPageLink={"/viewPeople"}
        breadCrumbs={[{ subPage: "View All People", link: "/viewPeople" }]}
      />

      <input
        type="text"
        placeholder={t("Search by name...")}
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
        <div className="bg-white text-left text-black w-[250px] rounded-lg my-8">
          <div className="border-b flex justify-between items-center px-6 py-4">
            <h4 className="text-base text-gray-900 font-semibold">
              {t("Identity Card")}
            </h4>
            <XMarkIcon
              onClick={() => setCardModalOpen(false)}
              className="w-5 h-5 text-gray-600 cursor-pointer"
            />
          </div>
          <div
            ref={identityCardRef}
            className="rounded px-3 py-1  items-center "
          >
            <IDCard {...cardModalOpen} />
          </div>
          <button
            className="ml-4 inline-flex gap-2 w-[88%] rounded-md bg-indigo-600  items-center text-center justify-center my-4 text-sm font-semibold py-1 text-white z-100"
            onClick={handlePrint}
          >
            Print
            <PrinterIcon className="w-5 h-5" />
          </button>
        </div>
      </Modal>

      <Modal isModalOpen={!!peopleData} setModalOpen={setPeopleData}>
        <div className="bg-white text-left text-black w-[600px] md:w-[700px] rounded-lg my-8">
          <div className="border-b flex justify-between items-center px-6 py-4">
            <h4 className="text-base text-gray-900 font-semibold">{t("User Data")}</h4>
            <XMarkIcon
              onClick={() => setPeopleData(false)}
              className="w-5 h-5 text-gray-600 cursor-pointer"
            />
          </div>

          <UserData {...peopleData} />
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
