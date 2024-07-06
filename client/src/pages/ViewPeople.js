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
import { nationalities } from "../utils/nationalities";

const getCountryName = (alpha2Code) => {
  const country = nationalities.find(nat => nat.alpha_2_code === alpha2Code);
  return country ? country.en_short_name : '';
};
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
  const [nationality, setNationality] = useState('')
  const [year, setYear] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('')

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
    { id: "id", label: t("ID") },
    {
      id: "Name",
      label: t("Name"),
      component: (data) => (
        <>
          {data.firstName || ""} {data.lastName || ""}
        </>
      ),
    },
    { id: "maritalStatus", label: t("Marital status"), component: (data) => <>{data.maritalStatus || ''} </> },
    {
      id: "gender",
      label: t("Gender"),
      component: (data) => <>{data.gender || ""} </>,
    },
    {
      id: "country",
      label: t("Nationality"),
      component: (data) => <>{getCountryName(data.nationality) || ''}</>,
    },
    {
      id: "city",
      label: t("City"),
      component: (data) => <>{data.city || ""} </>,
    },

    {
      id: "birthPlace",
      label: t("Birth Place"),
      component: (data) => <>{data.birthPlace || ""} </>,
    },
    {
      id: "RegistrationDate",
      label: t("Registration Date"),
      component: (data) => <>{new Date(data.createdAt).toISOString().slice(0, 10) || ""} </>,
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
        params: {
          page, limit, search: searchQuery,
          ...(nationality && { nationality }),
          ...(year && { year }),
          ...(age && { age }),
        },
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
  }, [limit, page, searchQuery, nationality, gender, year, age]);

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
                <select
                  type="text"
                  name="nationality"
                  id="nationality"
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                >
                  <option value="">Select</option>
                  {nationalities.map((nationality) => <option value={nationality.alpha_2_code}>{nationality.nationality}</option>)}
                </select>
              </div>
            </div>
            <div className="">
              <label
                htmlFor="gender"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                {t("Gender")}
              </label>
              <div className="mt-2">
                <select
                  id="gender"
                  name="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  autoComplete="Gender"
                  className="block w-[100%] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset"
                >
                  <option value="">Select</option>
                  <option value={"Male"}>{t("Male")}</option>
                  <option value={"Female"}>{t("Female")}</option>
                  <option value={"Other"}>{t("Other")}</option>
                </select>
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
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
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
                {t("Registration Date")}
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="year"
                  id="year"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  autoComplete="given-name"
                  className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                />
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
        <div className="bg-white text-left text-black w-[400px] rounded-lg my-8">
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
            Stampa
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
          <EditForm {...editModalOpen} onCancel={handleEditCancel} setEditModalOpen={setEditModalOpen} />
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
