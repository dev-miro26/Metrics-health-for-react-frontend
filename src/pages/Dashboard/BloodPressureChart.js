import React from "react";

import { useSelector } from "react-redux";
import ReactApexChart from "react-apexcharts";
import moment from "moment";
const BloodChart = ({
  data,
  filterStartDay,
  filterEndDay,
  selectedShowChatMetric,
}) => {
  const metric = useSelector((state) => state.metrics.metrics).filter(
    (metric) => metric._id === selectedShowChatMetric
  )[0];
  const sortedData = data.sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
  );
  //   const categories = sortedData.map((data) =>
  //     moment(data.updatedAt).format("MM/DD/YYYY")
  //   );

  // const dates = data.map((item) => item.createdAt);
  // const oldestDate = moment.tz(dates.sort()[0], "UTC").local().startOf("day");
  // const today = moment().tz(moment.tz.guess()).startOf("day");
  const dateArray = [];
  // const valueArray = [];
  const hP = [];
  const lP = [];
  const hR = [];

  for (
    let currentDate = filterStartDay.clone();
    currentDate <= filterEndDay;
    currentDate.add(1, "days")
  ) {
    dateArray.push(currentDate.format("DD/MMMM"));

    const mm = sortedData.filter(
      (d) =>
        moment(d.createdAt).local().format("YYYY-MM-DD") ===
        currentDate.local().format("YYYY-MM-DD")
    );
    const total = mm[0]?.wage?.split(",");
    mm[0] ? hP.push(parseInt(total[0])) : hP.push(0);
    mm[0] ? lP.push(parseInt(total[1])) : lP.push(0);
    mm[0] ? hR.push(parseInt(total[2])) : hR.push(0);
  }

  const state = {
    options: {
      colors: ["#008FFB", "#00E396", "#F04438", "#FF4560"],
      chart: {
        id: "basic-line",
        dropShadow: {
          enabled: true,
          top: 4,
          left: 4,
          blur: 3,
          opacity: 0.2,
        },
        background: "#ffffff",
      },
      xaxis: {
        categories: dateArray,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: metric.name,
      },
      markers: {
        size: 6,
        strokeWidth: 0,
        colors: ["#FFA41B"],
        hover: {
          size: 8,
        },
      },
      tooltip: {
        theme: "dark",
        x: {
          show: true,
          format: "MMM",
        },
        y: [
          {
            title: {
              formatter: function () {
                return "";
              },
            },
          },
          {
            title: {
              formatter: function () {
                return "";
              },
            },
          },
        ],
      },
    },
    series: [
      {
        name: "Systolic pressure",
        data: hP,
      },
      {
        name: "Diastolic pressure ",
        data: lP,
      },
      {
        name: "Heart Rate",
        data: hR,
      },
    ],
  };

  return (
    <ReactApexChart
      options={state.options}
      series={state.series}
      type="line"
      height={350}
    />
  );
};

export default BloodChart;
