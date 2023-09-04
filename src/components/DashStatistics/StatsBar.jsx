"use client";
import { Bar } from "react-chartjs-2";
import {values, day} from "./data.js";
import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


const StatsBar = () => {
  const [barData, setBarData] = useState({
    datasets: [],
  });

const [barOptions, setBarOptions] = useState({});

  useEffect(() => {
    setBarData({
      labels: day,
      datasets: [
        {
          label: "Sales $",
          data: values,
          borderColor: "#0070F0",
          backgroundColor: "#0070F0",
          borderRadius: 25,
          barPercentage: 0.5,
          hoverBackgroundColor:"#519aed",
          hoverBorderColor:"#0070F0"
          
        },
      ],
    });
    setBarOptions({
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Daily Revenue",
        },
      },
      maintainAspectRatio: false,
      responsive: true,
    });
  }, []);
  return <Bar options={barOptions} data={barData} />;
};

export default StatsBar;
