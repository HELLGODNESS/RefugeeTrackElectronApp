import React, { useState, useEffect, Fragment } from "react";
import DataTable from "../components/DataTable";
import Paginator from "../components/paginator";
import SectionHeader from "../components/SectionHeader";
import Dialog from "../components/Dialog";
import { useTranslation } from "react-i18next";
import AutoComplete from "../components/AutoComplete";
import axios from "axios";
import { TrashIcon } from "@heroicons/react/24/outline";
import config from "../config";
import { nationalities } from '../utils/nationalities.js';

const getCountryName = (alpha2Code) => {
  const country = nationalities.find(nat => nat.alpha_2_code === alpha2Code);
  return country ? country.en_short_name : '';
};

function Services() {
  const { t, i18n } = useTranslation();
  const [search, setSearch] = useState();
  const [session, setSession] = useState("Cafeteria");
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [addPerson, setAddPerson] = useState()

  const [tableBodyList, setTableBodyList] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);



  const [state, setState] = useState({
    tableBodyList: tableBodyList,
    dialogInfo: {
      isOpened: false,
      text: "",
      type: "",
    },
  });

  const [tableHeaders, setTableHeaders] = useState([
    { id: "id", label: t("ID") },
    { id: "Name", label: t("Name"), component: (data) => <>{data.firstName || ''} {data.lastName || ''}</> },
    { id: "gender", label: t("Gender"), component: (data) => <>{data.gender || ''} </> },
    { id: "bornOn", label: t("Born on"), component: (data) => <>{new Date(data.bornOn).toISOString().slice(0, 10) || ""} </> },
    { id: "nationality", label: t("Nationality"), component: (data) => <>{getCountryName(data.nationality) || ''}</> },
    { id: "child", label: t("child"), component: (data) => <>{data.child || 1}</> },
    { id: "allergies", label: t("Allergies"), component: (data) => <>{data.allergies || ''} </> },

    {
      id: "Image",
      label: t("Photo"),
      component: (data, setData) => (
        <img
          className="w-16 h-16 rounded-full"
          // src={data.Image}
          src={data.image ? `${config.ipAddress}/file/${data.image}` : 'user.png'}
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
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      ),
    },
  ]);

  const getServices = () => {
    setLoading(true);
    axios
      .get(`${config.ipAddress}/service`, {
        params: { page, limit, date: new Date().toDateString(), service: session },
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
    getServices()
  }, [limit, page, addPerson, session]);



  function deleteFromTable(data) {
    axios
      .delete(`${config.ipAddress}/service`, {
        params: { id: data.id },
      })
      .then((res) => {
        getServices()

      })
      .catch((err) => {
        console.log(err);
      });
  }



  return (

    <div className="mt-10">
      <SectionHeader title={t("Services")}
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

              <option value={"CAFETERIA"}>{t("Cafeteria")}</option>
              <option value={"TAKEAWAY_PACKAGE"}>{t("Takeaway Package")}</option>
              <option value={"SHOWERS"}>{t("Shower")}</option>
              <option value={"COVERS"}>{t("Covers")}</option>
              <option value={"MEDICINES"}>{t("Medicines")}</option>
            </select>

            {/* <button type="button" class="rounded-md  bg-indigo-600 px-3 py-2 text-sm font-semibold text-white whitespace-nowrap shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"> Start Session</button> */}
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
      <AutoComplete activeSession={session} setAddPerson={setAddPerson} />
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
