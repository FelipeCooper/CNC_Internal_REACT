import React from "react";
import { ResponsiveContainer, PieChart, Pie } from "recharts";

const data = [{ name: "Barata", value: 2 }, { name: "Mosca", value: 4 }];

export default ({ name }) =>
  <ResponsiveContainer width="100%" height={500}>
    <PieChart height={500}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        outerRadius={100}
        fill="#000"
        dataKey="value"
        label={({
          cx,
          cy,
          midAngle,
          innerRadius,
          outerRadius,
          value,
          index
        }) => {
          console.log("handling label?");
          const RADIAN = Math.PI / 180;
          // eslint-disable-next-line
          const radius = 25 + innerRadius + (outerRadius - innerRadius);
          const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
          // eslint-disable-next-line
          const x = cx + radius * Math.cos(-midAngle * RADIAN);
          // eslint-disable-next-line
          const y = cy + radius * Math.sin(-midAngle * RADIAN);

          return (
            <text
              x={x}
              y={y}
              fill="#000"
              textAnchor={x > cx ? "start" : "end"}
              dominantBaseline="central"
            >
              {data[index].name} ({value})
            </text>
          );
        }}
      />
    </PieChart>
  </ResponsiveContainer>;

