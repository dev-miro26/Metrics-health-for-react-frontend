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

  const oldestDate = moment.min(data.map((item) => moment(item.createdAt)));
  const currentDate = moment(new Date()).local();
  const dateArray = [];
  const valueArray = [];

  for (
    let m = moment(oldestDate).local();
    m.isSameOrBefore(currentDate);
    m.add(1, "day")
  ) {
    dateArray.push(m.local().format("DD/MMMM"));

    const mm = sortedData.filter(
      (d) =>
        moment(d.createdAt).local().format("YYYY-MM-DD") ===
        m.local().format("YYYY-MM-DD")
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
        curve: "smooth",
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
