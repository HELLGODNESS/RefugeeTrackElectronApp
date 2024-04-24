import React from 'react';
import ReactApexChart from "react-apexcharts";

function BarChart({ barchartStats }) {

    const options = {
        chart: {
            type: 'bar',
            height: 350
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                borderRadiusApplication: 'end',
                horizontal: true,
            }
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            categories: Object.keys(barchartStats.nationalities || {})
        }
    }

    const series = [{
        data: Object.values(barchartStats.nationalities || {})
    }]



    return (
        <div>
            Services by countries
            <div id="chart">
                <ReactApexChart options={options} series={series} type="bar" height={350} />
            </div>
            <div id="html-dist"></div>
        </div>)

}
export default BarChart;