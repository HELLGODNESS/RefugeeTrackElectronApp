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
import toast from "react-hot-toast";
import config from "../config";
import EditForm from "../components/EditForm";
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';

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
  const [editModalOpen, setEditModalOpen] = useState(false);

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
      id: "nationality",
      label: t("Nationality"),
      component: (data) => <>{data.livewith || ""} </>,
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
      id: "bornOn",
      label: "Birthday",
      component: (data) => <>{data.emailAddress || ""} </>,
    },
    {
      id: "allergies",
      label: t("Allergies"),
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
            data.image ? `${config.ipAddress}/file/${data.image}` : "user.png"
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
            title="Id Card"
            onClick={(e) => setCardModalOpen(data)}
          >
            <IdentificationIcon className="w-5 h-5" />
          </button>
          <button
            className=" no-focus"
            title="Edit User Data"
             onClick={(e) => setEditModalOpen(data)}
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


  const getPeople = () => {
    setLoading(true);
    axios
      .get(`${config.ipAddress}/person`, {
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
  }

  useEffect(() => {
    getPeople()
  }, [limit, page, searchQuery]);

  function deleteFromTable(data) {
    axios
      .delete(`${config.ipAddress}/person`, {
        params: { id: data.id },
      })
      .then((res) => {
        getPeople()
        toast.success("Persona Eliminata con Successo");
      })
      .catch((err) => {
        console.log(err);
        toast.error(JSON.stringify(err));
      });
  }

  const handleSearchInputChange = (e) => {
    console.log(e.target.value);
    setSearchQuery(e.target.value);
  };

  const handleEditCancel = () => {
    setEditModalOpen(false);
  };
  
  const handlePrint = () => {
    if (!identityCardRef.current) {
      console.error("Tessera non Trovata.");
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

<div className='mx-8 w-[80%] mt-2 '>
      <h2 className="text-xl font-medium leading-6 text-gray-900 px-1 mt-3 mb-3">{t("Filters")}</h2>
      <div className='my-2'>

        <div className="px-1 grid  gap-4 md:grid-cols-6">

      

<div className="">
           
            <div className="mt-8">
              <input
                placeholder={t("Search by name...")}
                value={searchQuery}
                onChange={handleSearchInputChange}
                autoComplete="given-name"
                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
              />
            </div>
          </div>
       
          <div className="">
            <label
              htmlFor="nationality"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              {t("Nationality")}
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="nationality"
                id="nationality"
               
                
                autoComplete="given-name"
                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="">
            <label
              htmlFor="sex"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              {t("Sex")}
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="sex"
                id="sex"
                
                
                autoComplete="given-name"
                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="">
            <label
              htmlFor="age"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              {t("Age")}
            </label>
            <div className="mt-2">
              <input
                type="number"
                name="age"
                id="age"
                
                
                autoComplete="given-name"
                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="">
            <label
              htmlFor="year"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              {t("Years")}
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="year"
                id="year"
                autoComplete="given-name"
                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="inline-flex">
            <div className="mt-8">
              <button type="button"  class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
                <span class="sr-only">Search</span>
              </button>
            </div>
            <div className="mt-8">
              <button  type="submit" class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <ArrowUpTrayIcon className='w-4 h-4' />
                <span class="sr-only">Export</span>
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>

    

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


      
      <Modal isModalOpen={!!editModalOpen} setModalOpen={setEditModalOpen}>
        <div className="bg-white text-left text-black w-[800px] md:w-[950px] rounded-lg my-8">
          <div className="border-b flex justify-between items-center px-6 py-4">
            <h4 className="text-base text-gray-900 font-semibold">{t("Edit User Data")}</h4>
            <XMarkIcon
              onClick={() => setEditModalOpen(false)}
              className="w-5 h-5 text-gray-600 cursor-pointer"
            />
          </div>
          <EditForm {...editModalOpen} onCancel={handleEditCancel} />
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
