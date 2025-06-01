"use client";
import { useState, useEffect } from "react";
import { TrendingUp, Table } from "lucide-react";
import { ref, onValue } from "firebase/database";
import { database } from "@/config/firebase";
import Card from "./components/Card";
import Graph from "./components/Graph";
import TableComponent from "./components/Table";

export default function HomePage() {
  const [sensorData, setSensorData] = useState({
    temperature: 0,
    humidity: 0,
    smoke: 0,
  });

  const [activeTab, setActiveTab] = useState("graph"); // current, graph, table

  useEffect(() => {
    const dbRef = ref(database, "terkini"); // sesuaikan dengan path di Firebase
    const unsubscribe = onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setSensorData({
          temperature: parseFloat(data.suhu) || 0,
          humidity: parseFloat(data.kelembapan) || 0,
          smoke: parseFloat(data.gas) || 0,
        });
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 mx-auto">
      {/* Fixed Cards at top */}
      <div className="p-4 w-full grid grid-cols-3 gap-2 md:gap-4">
        {["temperature", "humidity", "smoke"].map((item) => (
          <Card key={item} dataType={item} sensorData={sensorData} />
        ))}
      </div>

      {/* Content Area - Tab berdasarkan yang dipilih */}
      <div className="h-[calc(100vh-240px)] md:h-[calc(100vh-220px)] overflow-y-auto bg-gray-100">
        {activeTab === "graph" && <Graph />}
        {activeTab === "table" && <TableComponent />}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-2xl mx-auto">
          <div className="flex">
            {/* Graph Tab */}
            <button
              onClick={() => setActiveTab("graph")}
              className={`flex-1 flex flex-col items-center justify-center py-3 px-2 ${
                activeTab === "graph"
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <TrendingUp size={20} className="mb-1" />
              <span className="text-xs font-medium">Grafik</span>
            </button>

            {/* Table Tab */}
            <button
              onClick={() => setActiveTab("table")}
              className={`flex-1 flex flex-col items-center justify-center py-3 px-2 ${
                activeTab === "table"
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <Table size={20} className="mb-1" />
              <span className="text-xs font-medium">Tabel</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
