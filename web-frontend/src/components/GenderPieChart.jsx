import React from "react";
import { PieChart, Pie, Cell, Legend } from "recharts";

const GenderPieChart = ({ males, females }) => {
  const data = [
    { name: "Views from Males", value: males },
    { name: "Views from Females", value: females },
  ];

  const COLORS = ["#003f5c", "#ff6361"];

  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "80%" }}>
        <PieChart width={400} height={300}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend align="right" verticalAlign="middle" layout="vertical" />
        </PieChart>
      </div>
    </div>
  );
};

export default GenderPieChart;
