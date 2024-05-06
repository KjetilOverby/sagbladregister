/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const BarchartServiceTypes = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (chartRef.current && data) {
      // If there's an old chart instance, destroy it
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }

      const chartData = {
        labels: data.map((item) => item.service),
        datasets: [
          {
            label: "Service Count",
            data: data.map((item) => item._count.service),
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
            ],
            borderWidth: 1,
          },
        ],
      };

      // Create a new chart instance and store it in the ref
      chartInstanceRef.current = new Chart(chartRef.current, {
        type: "bar",
        data: chartData,
      });
    }
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default BarchartServiceTypes;
