"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getRecentData } from "./data";

export default function Graph() {
  const chartData = getRecentData(10);

  return (
    <div className="px-4 space-y-4">
      {/* Temperature Chart */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <h3 className="text-xs md:text-sm font-medium text-gray-700 mb-3">
          Suhu (°C)
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="time"
                tick={{ fontSize: 10 }}
                className="text-xs"
              />
              <YAxis tick={{ fontSize: 10 }} className="text-xs" />
              <Tooltip contentStyle={{ fontSize: "12px" }} />
              <Line
                type="monotone"
                dataKey="temperature"
                stroke="#ef4444"
                strokeWidth={2}
                dot={{ fill: "#ef4444" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Humidity Chart */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <h3 className="text-xs md:text-sm font-medium text-gray-700 mb-3">
          Kelembapan (%)
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="time"
                tick={{ fontSize: 10 }}
                className="text-xs"
              />
              <YAxis tick={{ fontSize: 10 }} className="text-xs" />
              <Tooltip contentStyle={{ fontSize: "12px" }} />
              <Line
                type="monotone"
                dataKey="humidity"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: "#3b82f6" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Smoke Chart */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <h3 className="text-xs md:text-sm font-medium text-gray-700 mb-3">
          Gas/Asap (ppm)
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="time"
                tick={{ fontSize: 10 }}
                className="text-xs"
              />
              <YAxis tick={{ fontSize: 10 }} className="text-xs" />
              <Tooltip contentStyle={{ fontSize: "12px" }} />
              <Line
                type="monotone"
                dataKey="smoke"
                stroke="#eab308"
                strokeWidth={2}
                dot={{ fill: "#eab308" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
