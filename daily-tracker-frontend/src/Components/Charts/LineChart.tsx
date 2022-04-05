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
import { useForm } from "react-hook-form"; 
import "./charts.css"
type Props = {
    lineChartData: LineChartDateInfo[]
}
type Inputs = { 
    sleep: boolean
    work: boolean
    train: boolean
    learn: boolean
    brain: boolean
    relax: boolean
    fun: boolean
}

export default function App({lineChartData}:Props) {
    const { register, watch, formState: { errors } } = useForm<Inputs>();
  return (
    <>
        <form  className="chart-options">
            <label htmlFor="sleep">
                Sleep: <input type="checkbox" {...register("sleep")} name="sleep" id="sleep" />
            </label>
            <label htmlFor="work">
                Work: <input type="checkbox" {...register("work")} name="work" id="work" />
            </label>
            <label htmlFor="train">
                Train <input type="checkbox" {...register("train")} name="train" id="train" />
            </label>
            <label htmlFor="relax">
                Relax: <input type="checkbox" {...register("relax")} name="relax" id="relax" />
            </label>
            <label htmlFor="learn">
                Learn: <input type="checkbox" {...register("learn")} name="learn" id="learn" />
            </label>
            <label htmlFor="brain">
                Brain: <input type="checkbox" {...register("brain")} name="brain" id="brain" />
            </label>
            <label htmlFor="fun">
                Fun <input type="checkbox" {...register("fun")} name="" id="fun" />
            </label>
        </form>
        <LineChart
        width={800}
        height={400}
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
        { watch(`sleep`) && <Line type="monotone" dataKey="Sleep" stroke="#8884d8" /> }
        { watch(`work`) && <Line type="monotone" dataKey="Work" stroke="#00C49F" /> }
        { watch(`train`) && <Line type="monotone" dataKey="Train" stroke="#FFBB28" /> }
        { watch(`relax`) && <Line type="monotone" dataKey="Relax" stroke="#FF8042" /> }
        { watch(`brain`) && <Line type="monotone" dataKey="Brain" stroke="#FF9092" /> }
        { watch(`fun`) && <Line type="monotone" dataKey="Fun" stroke="#AB9992'" /> }
        { watch(`learn`) && <Line type="monotone" dataKey="Learn" stroke="#FF1202" /> }
        </LineChart>
    </>
  );
}

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF9092', '#AB9992', "#FF1202" ];
