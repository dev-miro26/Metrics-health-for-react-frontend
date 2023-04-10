import React from "react";
import { useSelector } from "react-redux";
import ReactApexChart from "react-apexcharts";
import moment from "moment-timezone";
const OneLineChart = ({ data, selectedShowChatMetric }) => {
  const metric = useSelector((state) => state.metrics.metrics).filter(
    (metric) => metric._id === selectedShowChatMetric
  )[0];
  const sortedData = data.sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
  );
  //   const categories = sortedData.map((data) =>
  //     moment(data.updatedAt).format("MM/DD/YYYY")
  //   );
  const dates = data.map((item) => item.createdAt);
  const oldestDate = moment.tz(dates.sort()[0], "UTC").local().startOf("day");
  const today = moment().tz(moment.tz.guess()).startOf("day");
  const dateArray = [];
  const valueArray = [];

  for (
    let currentDate = oldestDate.clone();
    currentDate <= today;
    currentDate.add(1, "days")
  ) {
    dateArray.push(currentDate.format("DD/MMMM"));

    const mm = sortedData.filter(
      (d) =>
        moment(d.createdAt).format("YYYY-MM-DD") ===
        currentDate.format("YYYY-MM-DD")
    );

    mm[0]
      ? valueArray.push(
          parseFloat(mm[0]?.wage) - parseInt(mm[0]?.wage) === 0
            ? parseInt(mm[0]?.wage)
            : parseFloat(mm[0]?.wage)
        )
      : valueArray.push(0);
  }

  console.log(sortedData, dateArray, valueArray);

  const state = {
    colors: ["#00e396"],
    options: {
      chart: {
        id: "basic-line",
      },
      xaxis: {
        categories: dateArray,
      },
      stroke: {
        curve: "straight",
        width: 2,
      },
      title: {
        text: metric?.name,
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
        name: "date",
        data: valueArray,
      },
    ],
  };

  return (
    <ReactApexChart
      options={state.options}
      series={state.series}
      type="area"
      height={350}
    />
  );
};

export default OneLineChart;
