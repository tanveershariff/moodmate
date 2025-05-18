import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const MOOD_COLORS = {
  Happy: "#facc15",
  Calm: "#60a5fa",
  Neutral: "#a3a3a3",
  Sad: "#2563eb",
  Angry: "#f87171",
};

const MoodSummary = ({ moodData, id }) => {
  const moodCounts = {};
  Object.values(moodData).forEach((mood) => {
    moodCounts[mood.label] = (moodCounts[mood.label] || 0) + 1;
  });
  const total = Object.values(moodCounts).reduce((a, b) => a + b, 0);
  const data = Object.entries(moodCounts).map(([label, value]) => ({
    name: label,
    value,
    color: MOOD_COLORS[label] || "#a3a3a3",
    percent: ((value / total) * 100).toFixed(0),
  }));

  return (
    <div id={id} className="bg-gradient-to-br from-white via-blue-50 to-purple-100 rounded-2xl shadow-2xl ring-2 ring-purple-100 border border-purple-200 p-6 w-full max-w-sm mx-auto animate-fade-in-down">
      <h2 className="text-xl font-bold mb-4 text-purple-700 text-center">Mood Summary</h2>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={45}
            outerRadius={70}
            fill="#8884d8"
            label={({
              cx,
              cy,
              midAngle,
              outerRadius,
              percent,
              name,
              value,
            }) => {
              const radius = outerRadius + 25;
              const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
              const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

              return (
                <text
                  x={x}
                  y={y}
                  fill="#4a0072"
                  textAnchor={x > cx ? 'start' : 'end'}
                  dominantBaseline="central"
                >
                  {`${name}: ${(percent * 100).toFixed(0)}%`}
                </text>
              );
            }}
            labelLine={false}
            isAnimationActive={true}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value, name) => [`${value}`, `${name}`]} contentStyle={{ backgroundColor: '#fff', border: '1px solid #d1d5db', borderRadius: '8px' }} />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex flex-wrap justify-center mt-4 gap-2 text-purple-700 font-semibold">
        {data.map((entry, idx) => (
          <span key={entry.name} className="flex items-center text-sm">
            <span
              className="inline-block w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: entry.color }}
            ></span>
            {entry.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MoodSummary;
