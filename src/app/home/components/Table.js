"use client";
import { getAllData } from "./data";

export default function Table() {
  const historicalData = getAllData();

  const formatDateTime = (timestamp) => {
    if (!timestamp) return "N/A";
    try {
      const date = new Date(timestamp);
      return date.toLocaleString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return timestamp;
    }
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
                    {formatDateTime(item.timestamp)}
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
