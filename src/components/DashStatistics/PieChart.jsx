import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

const PieChart = ({ date, value, title }) => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  var options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  var data = {
    labels: date,
    datasets: [
      {
        label: title,
        data: value,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "#66ff6e2d",
          "#ff66bf28",
          "#ffcd56",
          "#ff6384",
          "#36a2eb",
          "#4bc0c0",
          "#ff9f40",
          "#ff66bf",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "#41f276",
          "#ff66bf",
          "#ffc658",
          "#ff5370",
          "#2a80b9",
          "#26a59a",
          "#ff7f25",
          "#ff66bf",
        ],
        borderWidth: 1,
      },
    ],
  };
  return <Pie data={data} options={options} />;
};

export default PieChart;
