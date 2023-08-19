import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { values, day } from "./data.js";
ChartJS.register(ArcElement, Tooltip, Legend);

var options = {
  responsive: true,
  maintainAspectRatio: false,
};

var data = {
  labels: day,
  datasets: [
    {
      label: "Popularidad en Navidad",
      data: values,
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "#66ff6e2d",
        "#ff66bf28",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "#41f276",
        "#ff66bf",
      ],
      borderWidth: 1,
    },
  ],
};

const PieChart = () => {
  return <Pie data={data} options={options} />;
};

export default PieChart;
