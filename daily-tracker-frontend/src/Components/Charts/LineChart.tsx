import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import { LineChartDateInfo } from "../../types";

type Props ={
    lineChartData: LineChartDateInfo[]
}

const data = [
    
];

export default function App({lineChartData}:Props) {
    console.log(lineChartData)
  return (
    <LineChart
      width={800}
      height={600}
      data={lineChartData}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="Date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="Sleep" stroke="#8884d8" />
      <Line type="monotone" dataKey="Work" stroke="#82ca9d" />
      <Line type="monotone" dataKey="Train" stroke="#82ca9d" />
      <Line type="monotone" dataKey="Relax" stroke="#82ca9d" />
      <Line type="monotone" dataKey="Brain" stroke="#82ca9d" />
      <Line type="monotone" dataKey="Fun" stroke="#82ca9d" />
      <Line type="monotone" dataKey="Learn" stroke="#82ca9d" />
    </LineChart>
  );
}
