"use client";
import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "@/config/firebase";

export default function Table() {
  const [historicalData, setHistoricalData] = useState([]);

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
              id: `${date}-${time}`,
              displayTime: `${date} ${time}`,
              temperature: Number(record.suhu) || 0,
              humidity: Number(record.kelembapan) || 0,
              smoke: Number(record.gas) || 0,
              timestamp: new Date(`${date} ${time}`).getTime(),
            });
          }
        });
      });

      // Sort dari yang terbaru
      const sortedData = data.sort((a, b) => b.timestamp - a.timestamp);
      setHistoricalData(sortedData);
    });

    return () => unsubscribe();
  }, []);

  const formatDateTime = (displayTime) => {
    return displayTime || "N/A";
  };

  return (
    <div className="p-4">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-1 md:px-4 py-1 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Waktu
                </th>
                <th className="px-1 md:px-4 py-1 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Suhu (°C)
                </th>
                <th className="px-1 md:px-4 py-1 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kelembapan (%)
                </th>
                <th className="px-1 md:px-4 py-1 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Gas/Asap (ppm)
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {historicalData.map((item, index) => (
                <tr key={item.id || index} className="hover:bg-gray-50">
                  <td className="px-1 md:px-4 py-1 md:py-3 whitespace-nowrap text-xs md:text-sm text-gray-900">
                    {formatDateTime(item.displayTime)}
                  </td>
                  <td className="px-1 md:px-4 py-1 md:py-3 whitespace-nowrap text-xs md:text-sm">
                    <span
                      className={`${
                        item.temperature > 35
                          ? "text-red-600 font-medium"
                          : "text-gray-900"
                      }`}
                    >
                      {item.temperature.toFixed(1)}
                    </span>
                  </td>
                  <td className="px-1 md:px-4 py-1 md:py-3 whitespace-nowrap text-xs md:text-sm">
                    <span
                      className={`${
                        item.humidity > 80
                          ? "text-blue-600 font-medium"
                          : "text-gray-900"
                      }`}
                    >
                      {item.humidity.toFixed(1)}
                    </span>
                  </td>
                  <td className="px-1 md:px-4 py-1 md:py-3 whitespace-nowrap text-xs md:text-sm">
                    <span
                      className={`${
                        item.smoke > 500
                          ? "text-yellow-600 font-medium"
                          : "text-gray-900"
                      }`}
                    >
                      {item.smoke.toFixed(0)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {historicalData.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Tidak ada data tersedia
          </div>
        )}
      </div>
    </div>
  );
}
