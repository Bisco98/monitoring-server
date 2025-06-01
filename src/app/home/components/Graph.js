"use client";
import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ref, onValue } from "firebase/database";
import { database } from "@/config/firebase";

export default function Graph() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const historyRef = ref(database, "riwayat");

    const unsubscribe = onValue(historyRef, (snapshot) => {
      const data = [];
      snapshot.forEach((dateSnapshot) => {
        const date = dateSnapshot.key;
        dateSnapshot.forEach((timeSnapshot) => {
          const time = timeSnapshot.key;
          const record = timeSnapshot.val();
          if (record) {
            data.push({
              time: time,
              date: date,
              temperature: Number(record.suhu) || 0,
              humidity: Number(record.kelembapan) || 0,
              smoke: Number(record.gas) || 0,
              // Buat timestamp untuk sorting
              timestamp: new Date(`${date} ${time}`).getTime(),
            });
          }
        });
      });

      // Sort dan ambil 10 data terakhir
      const sortedData = data
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, 10)
        .reverse();

      setChartData(sortedData);
    });

    return () => unsubscribe();
  }, []);

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
              <XAxis dataKey="time" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
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
              <XAxis dataKey="time" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
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
              <XAxis dataKey="time" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
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
