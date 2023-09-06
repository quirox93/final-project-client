"use client";
import { Bar } from "react-chartjs-2";
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

const StatsBar = ({title, date, value}) => {

  
  const [barData, setBarData] = useState({
    datasets: [],
  });

  const [barOptions, setBarOptions] = useState({});

  useEffect(() => {
    setBarData({
      labels: date,
      datasets: [
        {
          label: "Sales $",
          data: value,
          borderColor: "#0070F0",
          backgroundColor: "#0070F0",
          borderRadius: 25,
          barPercentage: 0.5,
          hoverBackgroundColor: "#519aed",
          hoverBorderColor: "#0070F0",
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
          text: title,
        },
      },
      maintainAspectRatio: false,
      responsive: true,
    });
  }, [date]);
  return <Bar options={barOptions} data={barData} />;
};

export default StatsBar;
