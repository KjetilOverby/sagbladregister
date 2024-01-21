/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const BarChart = ({ deleteReasonCount }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    // Destroy existing chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create a new chart instance
    const ctx = chartRef.current.getContext("2d");
    const labels = Object.keys(deleteReasonCount);
    const data = Object.values(deleteReasonCount);

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Antall",
            data: data,
            backgroundColor: "rgba(75,192,192,0.6)",
            borderColor: "rgba(75,192,192,1)",
            borderWidth: 1,
            drawOnChartArea: false,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: "rgba(75, 192, 192, .4)",
            },
            ticks: {
              stepSize: 1,
            },
          },
          x: {
            grid: {
              color: "transparent",
            },
          },
        },
      },
    });

    // Cleanup: Destroy the chart when the component is unmounted
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [deleteReasonCount]);

  return <canvas ref={chartRef} />;
};

export default BarChart;
