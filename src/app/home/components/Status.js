"use client";
import { useState, useEffect } from "react";
import { ref, update } from "firebase/database";
import { database } from "@/config/firebase";

export default function Status({ sensorData, config }) {
  const [currentStatus, setCurrentStatus] = useState("normal");
  const [showThresholdForm, setShowThresholdForm] = useState(false);
  const [thresholds, setThresholds] = useState({
    temperature: 0,
    humidity: 0,
    smoke: 0,
  });

  useEffect(() => {
    // Determine status based on sensor values whenever sensorData or config changes
    const status = determineStatus(sensorData, config);
    setCurrentStatus(status);
  }, [sensorData, config]);

  useEffect(() => {
    // Update local threshold values when config changes
    setThresholds({
      temperature: config.temperature?.thresholds || 0,
      humidity: config.humidity?.thresholds || 0,
      smoke: config.smoke?.thresholds || 0,
    });
  }, [config]);

  const determineStatus = (data, thresholds) => {
    // Use dynamic thresholds from config
    const tempThreshold = thresholds.temperature?.thresholds || 35;
    const humidityThreshold = thresholds.humidity?.thresholds || 80;
    const smokeThreshold = thresholds.smoke?.thresholds || 400;

    // Check if any sensor exceeds its threshold
    if (
      data.temperature > tempThreshold ||
      data.humidity > humidityThreshold ||
      data.smoke > smokeThreshold
    ) {
      return "berbahaya";
    }

    // For warning, use 80% of threshold values
    const tempWarning = tempThreshold * 0.8;
    const humidityWarning = humidityThreshold * 0.8;
    const smokeWarning = smokeThreshold * 0.8;

    if (
      data.temperature > tempWarning ||
      data.humidity > humidityWarning ||
      data.smoke > smokeWarning
    ) {
      return "peringatan";
    }

    return "normal";
  };

  const getStatusColor = () => {
    switch (currentStatus) {
      case "berbahaya":
        return "text-red-600 bg-red-50 border-red-200";
      case "peringatan":
      case "normal":
        return "text-green-600 bg-green-50 border-green-200";
      default:
        return "text-green-600 bg-green-50 border-green-200";
    }
  };

  const getStatusText = () => {
    switch (currentStatus) {
      case "berbahaya":
        return "BERBAHAYA";
      case "aman":
        return "AMAN";
      default:
        return "AMAN";
    }
  };

  const handleAlarmClick = () => {
    console.log("tombol di klik");
  };

  const handleThresholdSubmit = async (e) => {
    e.preventDefault();
    try {
      const updates = {
        "pengaturan/suhu/thresholds": parseFloat(thresholds.temperature),
        "pengaturan/kelembapan/thresholds": parseFloat(thresholds.humidity),
        "pengaturan/gas/thresholds": parseFloat(thresholds.smoke),
      };

      await update(ref(database), updates);
      setShowThresholdForm(false);
      console.log("Thresholds updated successfully");
    } catch (error) {
      console.error("Error updating thresholds:", error);
    }
  };

  const handleThresholdChange = (sensor, value) => {
    setThresholds((prev) => ({
      ...prev,
      [sensor]: value,
    }));
  };

  return (
    <div className="p-4">
      <h2 className="text-base md:text-lg font-semibold text-gray-800 mb-4">
        Status Sistem
      </h2>

      <div className="bg-white rounded-lg p-4 shadow-sm space-y-4">
        {/* Status Display */}
        <div className="text-center">
          <div
            className={`inline-block px-6 py-3 rounded-lg border-2 font-medium ${getStatusColor()}`}
          >
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
              Status Saat Ini
            </div>
            <div className="text-lg font-bold">{getStatusText()}</div>
          </div>
        </div>

        {/* Threshold Table */}
        <div className="overflow-hidden">
          <table className="w-full text-center">
            <thead>
              <tr>
                <th className="py-2 text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Threshold
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="py-2">
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="text-gray-700 font-medium">Suhu</div>
                    <div className="text-gray-700 font-medium">Kelembapan</div>
                    <div className="text-gray-700 font-medium">Gas/Asap</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="py-2">
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="font-medium text-gray-900">
                      {(config.temperature?.thresholds || 0).toFixed(1)}°C
                    </div>
                    <div className="font-medium text-gray-900">
                      {(config.humidity?.thresholds || 0).toFixed(1)}%
                    </div>
                    <div className="font-medium text-gray-900">
                      {(config.smoke?.thresholds || 0).toFixed(0)} ppm
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Threshold Settings Button */}
        <div className="pt-2">
          <button
            onClick={() => setShowThresholdForm(!showThresholdForm)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 mb-2"
          >
            {showThresholdForm ? "Tutup Pengaturan" : "Atur Threshold"}
          </button>
        </div>

        {/* Threshold Form */}
        {showThresholdForm && (
          <form
            onSubmit={handleThresholdSubmit}
            className="space-y-3 border-t pt-4"
          >
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Pengaturan Threshold
            </h3>

            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Suhu (°C)
                </label>
                <input
                  type="number"
                  value={thresholds.temperature}
                  onChange={(e) =>
                    handleThresholdChange("temperature", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  step="0.1"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Kelembapan (%)
                </label>
                <input
                  type="number"
                  value={thresholds.humidity}
                  onChange={(e) =>
                    handleThresholdChange("humidity", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  step="0.1"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Gas/Asap (ppm)
                </label>
                <input
                  type="number"
                  value={thresholds.smoke}
                  onChange={(e) =>
                    handleThresholdChange("smoke", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  step="1"
                  required
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Simpan
              </button>
              <button
                type="button"
                onClick={() => setShowThresholdForm(false)}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Batal
              </button>
            </div>
          </form>
        )}

        {/* Alarm Button */}
        <div className="pt-2">
          <button
            onClick={handleAlarmClick}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
          >
            Matikan Alarm
          </button>
        </div>
      </div>
    </div>
  );
}
