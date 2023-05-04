import React from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import moment from "moment";

export default function GroupChart({
  filterStartDay,
  filterEndDay,
  selectedGroup,
  metrics,
  allWages,
  setAllData,
  // allData,
}) {
  const groups = useSelector((state) => state.group.groups);

  const dateArray = [];
  for (
    let currentDate = filterStartDay.clone();
    currentDate <= filterEndDay;
    currentDate.add(1, "days")
  ) {
    dateArray.push(currentDate.local().format("DD/MMMM"));
  }
  const realGroupMetrics = [];
  const mainGroup = groups.filter((group) => group?._id === selectedGroup)[0];

  // eslint-disable-next-line array-callback-return
  mainGroup?.contents?.map((content) => {
    const filterMetric = metrics.filter(
      (metric) => metric?._id === content
    )[0];
    filterMetric?.fieldType !== "bloodPressure" &&
      filterMetric?.timing !== "everytime" &&
      realGroupMetrics.push(filterMetric);
  });

  // eslint-disable-next-line array-callback-return
  const TotalData = realGroupMetrics?.map((metric) => {
    const valueArray = [];

    const ignore = metric?.ignore;
    const eachWages = allWages.filter(
      (wage) => wage?.metricsId === metric?._id
    );
    const sortedData = eachWages?.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

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
      if (
        currentDate.local().format("DD/MMMM") ===
        filterStartDay.local().format("DD/MMMM")
      ) {
        mm[0]
          ? valueArray.push({
            x: currentDate.local().format("DD/MMMM"),
            y:
              parseFloat(mm[0]?.wage) - parseInt(mm[0]?.wage) === 0
                ? parseInt(mm[0]?.wage)
                : parseFloat(mm[0]?.wage),
          })
          : valueArray.push({
            x: currentDate.local().format("DD/MMMM"),
            y: 0,
          });
      } else if (
        currentDate.local().format("DD") === filterEndDay.format("DD")
      ) {
        mm[0]
          ? valueArray.push({
            x: currentDate.local().format("DD/MMMM"),
            y:
              parseFloat(mm[0]?.wage) - parseInt(mm[0]?.wage) === 0
                ? parseInt(mm[0]?.wage)
                : parseFloat(mm[0]?.wage),
          })
          : valueArray.push({
            x: currentDate.local().format("DD/MMMM"),
            y: 0,
          });
      } else {
        mm[0]
          ? valueArray.push({
            x: currentDate.local().format("DD/MMMM"),
            y:
              parseFloat(mm[0]?.wage) - parseInt(mm[0]?.wage) === 0
                ? parseInt(mm[0]?.wage)
                : parseFloat(mm[0]?.wage),
          })
          : !ignore &&
          valueArray.push({
            x: currentDate.local().format("DD/MMMM"),
            y: 0,
          });
      }
    }
    return { name: metric?.name, data: valueArray };

    // eslint-disable-next-line array-callback-return
  });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const options = {
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      type: "datetime",
      labels: {
        formatter: function (val, timestamp) {
          return moment(new Date(timestamp)).format("DD-MMM ");
        },
      },
    },
    yaxis: {
      labels: {
        show: true,
        formatter: function (value) {
          return value;
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },

  };
  const series = [...TotalData];
  return (
    <div className="app">
      <Chart options={options} series={series} type="line" height={350} />
    </div>
  );
}
