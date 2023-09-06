import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

const Linechart = ({ date, value, title }) => {
    
    ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
  );

  var midata = {
    labels: date,
    datasets: [
      // Cada una de las líneas del gráfico
      {
        label: title,
        data: value,
        tension: 0.5,
        fill: true,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        pointRadius: 5,
        pointBorderColor: "rgba(255, 99, 132)",
        pointBackgroundColor: "rgba(255, 99, 132)",
      },
    ],
  };

  var misoptions = {
    scales: {
      y: {
        min: 0,
      },
      x: {
        ticks: { color: "gray" },
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  return <Line data={midata} options={misoptions} />;
};

export default Linechart;
