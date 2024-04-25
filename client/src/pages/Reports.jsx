
import { EyeIcon, ScaleIcon, XMarkIcon } from '@heroicons/react/20/solid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import config from '../config';
import Datepicker from "react-tailwindcss-datepicker";
import { subDays } from 'date-fns';
import Chart from "react-apexcharts";
import DataTable from '../components/DataTable';
import Paginator from '../components/paginator';
import Modal from '../components/Modal';
import UserData from '../components/UserData';
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import Barchart from '../components/Barchart';

export default function Reports() {
  const { t, i18n } = useTranslation();
  const [stats, setStats] = React.useState({});
  const [barchartStats, setBarchartStats] = React.useState({});

  const [counts, setCounts] = useState({});
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);

  const [tableBodyList, setTableBodyList] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [peopleData, setPeopleData] = useState(false);

  const [id, setId] = useState();
  const [name, setName] = useState();
  const [child, setChild] = useState();
  const [service, setService] = useState("CAFETERIA");

  const [value, setValue] = useState({
    startDate: subDays(new Date(), 7),
    endDate: new Date()
  });

  const handleValueChange = newValue => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };

  const cards = [
    { id: 'cafeteria', nameKey: 'Cafeteria', icon: ScaleIcon },
    { id: 'takeawayPackage', nameKey: 'Takeaway Package', icon: ScaleIcon },
    { id: 'showers', nameKey: 'Shower', icon: ScaleIcon },
    { id: 'covers', nameKey: 'Covers', icon: ScaleIcon },
    { id: 'medicines', nameKey: 'Medicines', icon: ScaleIcon },
  ];

  const options = {
    chart: {
      id: "basic-bar",
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false,
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: [2, 1],
      curve: 'smooth'
    },
    fill: {
      colors: ['#1A73E8', '#4CAF50', '#9C27B0', ' #FF5722', '#673AB7']
    },
    legend: {
      show: false
    },
    colors: ['#1C64F2', '#8BC34A', '#E91E63', '#FF9800', '#3F51B5'],
    labels: stats.cafeteria?.map(x => x.time) || [],
    xaxis: { type: 'datetime' },
    yaxis: {
      labels: {
        formatter: function (val) {
          return val.toFixed(0)
        }
      }
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val
        }
      },
    }
  }

  const [tableHeaders, setTableHeaders] = useState([
    { id: "id", label: t("ID") },
    { id: "Name", label: t("Name"), component: (data) => <>{data.firstName || ''} {data.lastName || ''}</> },
    { id: "gender", label: t("Gender"), component: (data) => <>{data.gender || ''} </> },
    { id: "livewith", label: t("Born in"), component: (data) => <>{data.livewith || ''} </> },
    { id: "city", label: t("City"), component: (data) => <>{data.city || ''} </> },
    { id: "emailAddress", label: t("Email"), component: (data) => <>{data.emailAddress || ''} </> },
    { id: "cell", label: t("Mobile phone"), component: (data) => <>{data.cell || ''}</> },

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
            title="User Data"
            onClick={(e) => setPeopleData(data)}
          >
            <EyeIcon className="w-5 h-5" />
          </button>
        </div>
      ),
    },
  ]);

  const getServices = () => {
    axios
      .get(`${config.ipAddress}/service`, {
        params: {

          ...(id && { id }),
          ...(service && { service }),
          ...(child && { child }),
          ...(name && { name }),
          ...(value.startDate && { startDate: value.startDate }),
          ...(value.endDate && { endDate: value.endDate }),
          page, limit
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
    console.log(value, 'value')
    axios
      .get(`${config.ipAddress}/service/count`, {
        params: { startDate: value.startDate, endDate: value.endDate },
      })
      .then((res) => {
        setCounts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios.get(`${config.ipAddress}/service/stats`, { params: { startDate: value.startDate, endDate: value.endDate } })
      .then((res) => {
        setStats(res.data);
      }).catch((err) => {
        console.log(err);
      });

    axios.get(`${config.ipAddress}/service/barchart`, { params: { startDate: value.startDate, endDate: value.endDate } })
      .then((res) => {
        setBarchartStats(res.data);
      }).catch((err) => {
        console.log(err);
      });

    setLoading(true);

    getServices();
  }, [value]);

  const handleDownload = async () => {
    try {
      // Make a GET request to download the file
      const response = await axios.get('http://192.168.119.33:4000/service/export', {
        responseType: 'blob' // Set responseType to 'blob' to receive binary data
      });

      // Create a blob URL and trigger download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'generated_file.xlsx');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };



  const series = [
    {
      name: t('Cafeteria'),
      data: stats.cafeteria?.map(x => x.count.toFixed(2) || 0) || []
    },
    {
      name: t('Takeaway Package'),
      data: stats.takeawayPackage?.map(x => x.count.toFixed(2) || 0) || []
    },
    {
      name: t('Showers'),
      data: stats.showers?.map(x => x.count.toFixed(2) || 0) || []
    },
    {
      name: t('Covers'),
      data: stats.covers?.map(x => x.count.toFixed(2) || 0) || []
    },
    {
      name: t('Medicines'),
      data: stats.medicines?.map(x => x.count.toFixed(2) || 0) || []
    }
  ]

  return (<>

    <div className="mx-auto w-[77%] px-4 sm:px-6 lg:px-8 mt-8">
      <div className='inline-flex w-[100%] justify-between '>

      <h2 className="text-lg font-medium leading-6 text-gray-900">{t("Overview")}</h2>
        <div className='w-1/3'>
          <Datepicker value={value} onChange={handleValueChange} />
        </div>
      </div>

      <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {/* Card */}
        {cards.map((card) => (
          <div key={card.id} className="overflow-hidden rounded-lg bg-white shadow">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <card.icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="truncate text-sm font-medium text-gray-500">{t(card.nameKey)}</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{counts[card.id] || 0}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
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

      <div className='p-6 shadow-md  rounded-lg bg-white mt-4'>
        <Chart
          options={options}
          series={series}
          type="area"
          height={200}
        />
      </div>
      <div className='p-6 shadow-md  rounded-lg bg-white mt-4'>
        <Barchart
          barchartStats={barchartStats}
        />
      </div>



    </div>
    <div className='mx-auto w-[77%] mt-4'>
      <h2 className="text-lg font-medium leading-6 text-gray-900 px-7 mt-8 mb-4">{t("Filters")}</h2>
      <div className='my-2'>

        <div className="px-8 grid  gap-4 md:grid-cols-5">
          <div className="">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              {t("ID")}
            </label>
            <div className="mt-2">
              <input
                type="number"
                name="id"
                id="id"
                value={id}
                onChange={(e) => setId(e.target.value)}
                autoComplete="given-name"
                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="">
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              {t("Name")}
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="given-name"
                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="">
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              {t("Child")}
            </label>
            <div className="mt-2">
              <input
                type="number"
                name="Child"
                id="Child"
                value={child}
                onChange={(e) => setChild(e.target.value)}
                autoComplete="given-name"
                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              {t("Service")}
            </label>
            <div className="mt-2">
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                autoComplete="Marital status"
                className="block w-[100%] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset"
              >

                <option value={"CAFETERIA"}>{t("Cafeteria")}</option>
                <option value={"TAKEAWAY_PACKAGE"}>{t("Takeaway Package")}</option>
                <option value={"SHOWERS"}>{t("Shower")}</option>
                <option value={"COVERS"}>{t("Covers")}</option>
                <option value={"MEDICINES"}>{t("Medicines")}</option>
              </select>
            </div>
          </div>

          <div className="inline-flex">
            <div className="mt-8">
              <button type="button" onClick={getServices} class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
                <span class="sr-only">Search</span>
              </button>
            </div>
            <div className="mt-8">
              <button onClick={handleDownload} type="submit" class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <ArrowUpTrayIcon className='w-4 h-4' />
                <span class="sr-only">Export</span>
              </button>
            </div>
          </div>

        </div>
      </div>
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
    </div></>
  );
}

