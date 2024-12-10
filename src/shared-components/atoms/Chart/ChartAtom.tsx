import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ChartAtomProps {
  data: any;
  options: any;
  className?: string;
}

const ChartAtom: React.FC<ChartAtomProps> = ({ data, options, className }) => {
  return (
    <div className={`chart-atom ${className || ""}`}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ChartAtom;
