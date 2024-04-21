
import { ScaleIcon } from '@heroicons/react/20/solid';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Chart from "react-apexcharts";

export default function Home() {
  const { t, i18n } = useTranslation();
  const [counts, setCounts] = React.useState({});
  const [stats, setStats] = React.useState({});

  const cards = [
    { id: "cafeteria", nameKey: "Cafeteria", icon: ScaleIcon },
    { id: "takeawayPackage", nameKey: "Takeaway Package", icon: ScaleIcon },
    { id: "showers", nameKey: "Shower", icon: ScaleIcon },
    { id: "covers", nameKey: "Covers", icon: ScaleIcon },
    { id: "medicines", nameKey: "Medicines", icon: ScaleIcon },
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

  useEffect(() => {
    axios
      .get("http://localhost:4000/service/count", {
        params: { date: new Date().toDateString() },
      })
      .then((res) => {
        setCounts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios.get("http://localhost:4000/service/stats", { params: { date: new Date().toDateString() } })
      .then((res) => {
        setStats(res.data);
      }).catch((err) => {
        console.log(err);
      });
  }, []);

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
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-8">
      <h2 className="text-lg font-medium leading-6 text-gray-900">
        {t("Overview")}
      </h2>
      <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {/* Card */}
        {cards.map((card) => (
          <div
            key={card.id}
            className="overflow-hidden rounded-lg bg-white shadow"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <card.icon
                    className="h-6 w-6 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="truncate text-sm font-medium text-gray-600">{t(card.nameKey)}</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {counts[card.id] || 0}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='p-6 shadow-md  rounded-lg bg-white mt-4'>
        <h1 className='text-sm font-medium text-gray-600'>Last 7 Days Stats</h1>
        <Chart
          options={options}
          series={series}
          type="area"
          height={200}
        />
      </div>
    </div>
  );
}
