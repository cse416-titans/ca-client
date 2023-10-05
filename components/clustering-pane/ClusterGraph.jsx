import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function ClusterGraph() {
  const data = [
    {
      name: "-3",
      uv: 0,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "-2",
      uv: 0.1,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "-1",
      uv: 0.2,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "0",
      uv: 0.5,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "1",
      uv: 0.2,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "2",
      uv: 0.1,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "3",
      uv: 0,
      pv: 4300,
      amt: 2100,
    },
  ];

  return (
    <AreaChart
      width={600}
      height={300}
      data={data}
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
    </AreaChart>
  );
}

export default ClusterGraph;
