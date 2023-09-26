import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart, getElementAtEvent } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import { useRef, useEffect } from "react";

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

export const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
  animation: false,
  plugins: {
    tooltip: {
      filter: function (tooltipItem) {
        return tooltipItem.datasetIndex === 0;
      },
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const dynamicColors = function () {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  const a = 0.1 + Math.random() * 0.5;
  return "rgba(" + r + "," + g + "," + b + "," + a + ")";
};

export const data = {
  labels: labels,
  datasets: [
    {
      type: "scatter",
      label: "District Plan",
      data: Array.from({ length: 1000 }, () => ({
        x: faker.datatype.number({ min: -100, max: 100 }),
        y: faker.datatype.number({ min: -100, max: 100 }),
      })),
      pointRadius: 3,
      backgroundColor: Array.from({ length: 1000 }, () => dynamicColors()),
      //point cross
    },
  ],
};

function BubbleChartPlan({ setStage }) {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = chartRef.current;
  }, []);

  return (
    <Chart
      type="bubble"
      ref={chartRef}
      onClick={(e) => {
        console.log(getElementAtEvent(chartRef.current, e));
        setStage(2);
      }}
      options={options}
      data={data}
    />
  );
}

export default BubbleChartPlan;
