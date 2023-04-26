import React from "react";
import { useSelector } from "react-redux";
import ReactApexChart from "react-apexcharts";
import moment from "moment-timezone";
const EveryTiimeChart = ({ data, selectedShowChatMetric, everyTimeDate }) => {
  const metric = useSelector((state) => state.metrics.metrics).filter(
    (metric) => metric._id === selectedShowChatMetric
  )[0];
  const sortedData = data.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  const Today = moment(everyTimeDate).format("YYYY-MM-DD").toString();
  function getDataBetweenDates(data) {
    const result = [];
    console.log(Today);

    data.forEach((item) => {
      const createdAt = moment(item.createdAt);
      console.log(createdAt.isSame(moment(Today), "day"));
      if (createdAt.isSame(moment(Today), "day") === true) {
        result.push(item);
      }
    });
    return result;
  }
  const realDate = getDataBetweenDates(sortedData);
  console.log(realDate, selectedShowChatMetric);

  const valueArray = [];
  for (let dateIndex = 0; dateIndex < realDate.length; dateIndex++) {
    valueArray.push({
      x: moment(data[dateIndex]?.createdAt),
      y: data[dateIndex]?.wage,
    });
  }
  console.log(valueArray);
  const times = [
    "00:00",
    "01:30",
    "03:00",
    "04:30",
    "06:00",
    "07:30",
    "09:00",
    "10:30",
    "12:00",
    "13:30",
    "15:00",
    "16:30",
    "18:00",
    "19:30",
    "21:00",
    "22:30",
  ];
  const state = {
    colors: ["#00e396"],
    options: {
      chart: {
        id: "basic-line",
        height: 350,
      },
      xaxis: {
        tickAmount: 8,
        type: "datetime",
        categories: valueArray ? "" : times,
        labels: {
          formatter: function (val, timestamp) {
            return moment(new Date(timestamp)).format("HH:mm:ss");
          },
        },
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

export default EveryTiimeChart;
