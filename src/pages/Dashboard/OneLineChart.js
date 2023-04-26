import React from "react";
import { useSelector } from "react-redux";
import ReactApexChart from "react-apexcharts";
import moment from "moment-timezone";
const OneLineChart = ({
  data,
  selectedShowChatMetric,
  filterStartDay,
  filterEndDay,
}) => {
  const metric = useSelector((state) => state.metrics.metrics).filter(
    (metric) => metric._id === selectedShowChatMetric
  )[0];
  const sortedData = data.sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
  );
  const ignore = metric.ignore;
  const dateArray = [];
  const valueArray = [];
  for (
    let currentDate = filterStartDay.clone();
    currentDate <= filterEndDay;
    currentDate.add(1, "days")
  ) {
    dateArray.push(currentDate.format("DD/MMMM"));

    const mm = sortedData.filter(
      (d) =>
        moment(d.createdAt).format("YYYY-MM-DD") ===
        currentDate.format("YYYY-MM-DD")
    );
    if (currentDate.format("DD/MMMM") === filterStartDay.format("DD/MMMM")) {
      mm[0]
        ? valueArray.push({
            x: currentDate.format("DD/MMMM"),
            y:
              parseFloat(mm[0]?.wage) - parseInt(mm[0]?.wage) === 0
                ? parseInt(mm[0]?.wage)
                : parseFloat(mm[0]?.wage),
          })
        : valueArray.push({
            x: currentDate.format("DD/MMMM"),
            y: 0,
          });
    } else if (
      currentDate.format("DD/MMMM") === filterEndDay.format("DD/MMMM")
    ) {
      mm[0]
        ? valueArray.push({
            x: currentDate.format("DD/MMMM"),
            y:
              parseFloat(mm[0]?.wage) - parseInt(mm[0]?.wage) === 0
                ? parseInt(mm[0]?.wage)
                : parseFloat(mm[0]?.wage),
          })
        : valueArray.push({
            x: currentDate.format("DD/MMMM"),
            y: 0,
          });
    } else {
      mm[0]
        ? valueArray.push({
            x: currentDate.format("DD/MMMM"),
            y:
              parseFloat(mm[0]?.wage) - parseInt(mm[0]?.wage) === 0
                ? parseInt(mm[0]?.wage)
                : parseFloat(mm[0]?.wage),
          })
        : !ignore &&
          valueArray.push({
            x: currentDate.format("DD/MMMM"),
            y: 0,
          });
    }
  }

  const state = {
    colors: ["#00e396"],
    options: {
      chart: {
        id: "basic-line",
        height: 350,
      },
      xaxis: {
        categories: dateArray,
      },
      yaxis: {
        show: true,
        labels: {
          show: true,
          formatter: function (value) {
            return value;
          },
        },
      },
      stroke: {
        curve: "smooth",
        width: 2,
      },
      title: {
        text: metric?.name,
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val === 0 ? "" : val;
        },

        style: {
          fontSize: "12px",
        },
      },
      tooltip: {
        theme: "dark",
        x: {
          show: true,
          format: "MMM",
        },
        y: {
          show: true,
          title: {
            formatter: function () {
              return `/${metric.postfix}`;
            },
          },
        },
      },
      tickAmount: 7,
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
