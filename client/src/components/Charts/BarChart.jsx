import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";

const BarChart = ({ ChartData }) => {
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: 0,
          },
        },
        {
          barPercentage: 0.2,
        },
      ],
      xAxes: [
        {
          barPercentage: 0.2,
        },
      ],
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return <Bar data={ChartData} options={options} />;
};

export default BarChart;
