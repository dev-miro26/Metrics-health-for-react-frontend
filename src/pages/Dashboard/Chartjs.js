import React, { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";

function LineChart({ data, options }) {
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const handleZoom = (event) => {
    if (chartInstance) {
      chartInstance.chartInstance.zoom(event);
    }
  };

  const handlePan = (event) => {
    if (chartInstance) {
      chartInstance.chartInstance.pan(event);
    }
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
  };

  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
  };

  useEffect(() => {
    if (chartInstance) {
      chartInstance.resetZoom();
    }
  }, [data, chartInstance]);

  useEffect(() => {
    if (startDate && endDate && startTime && endTime) {
      // You can use this function to fetch chart data based on selected date/time range
      fetchData(startDate, endDate, startTime, endTime);
    }
  }, [startDate, endDate, startTime, endTime]);

  const fetchData = (start, end, fromTime, toTime) => {
    console.log("Fetching data for range:", start, end, fromTime, toTime);
    // You can fetch chart data here and update the chart data
  };

  return (
    <div style={{ position: "relative", height: "500px", width: "800px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <label htmlFor="startDate">Start date:</label>
          <input
            type="date"
            name="startDate"
            onChange={handleStartDateChange}
          />
          <input
            type="time"
            name="startTime"
            onChange={handleStartTimeChange}
          />
        </div>
        <div>
          <label htmlFor="endDate">End date:</label>
          <input type="date" name="endDate" onChange={handleEndDateChange} />
          <input type="time" name="endTime" onChange={handleEndTimeChange} />
        </div>
      </div>
      <Line data={data} options={options} ref={chartRef} />
      {chartRef.current && (
        <>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 1,
            }}
            onWheel={handleZoom}
            onMouseDown={(event) => {
              event.preventDefault();
              chartRef.current.chartInstance.startPan(event);
            }}
            onMouseMove={(event) => {
              chartRef.current.chartInstance.pan(event);
            }}
            onMouseUp={() => {
              chartRef.current.chartInstance.stopPan();
            }}
          />
        </>
      )}
    </div>
  );
}

export default LineChart;
