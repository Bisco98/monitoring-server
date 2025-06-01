import React from "react";
import { Thermometer, Droplets, Cloud } from "lucide-react";

export default function Card({ dataType = "temperature", sensorData }) {
  const sensorConfigs = {
    temperature: {
      title: "Temperature",
      dataKey: "temperature",
      unit: "°C",
      decimals: 1,
      icon: Thermometer,
      gradient: "from-red-500 to-red-600",
      thresholds: [25, 28],
      statusLabels: ["Rendah", "Normal", "Tinggi"],
    },
    humidity: {
      title: "Humidity",
      dataKey: "humidity",
      unit: "%",
      decimals: 1,
      icon: Droplets,
      gradient: "from-blue-500 to-blue-600",
      thresholds: [60, 70],
      statusLabels: ["Rendah", "Normal", "Tinggi"],
    },
    smoke: {
      title: "Gas Level",
      dataKey: "smoke",
      unit: " ppm",
      decimals: 0,
      icon: Cloud,
      gradient: "from-yellow-500 to-yellow-600",
      thresholds: [30, 50],
      statusLabels: ["Aman", "Waspada", "Bahaya"],
    },
  };

  const getDataConfig = (type) => {
    const config = sensorConfigs[type] || sensorConfigs.temperature;
    const value = sensorData[config.dataKey];
    const statusColors = ["text-green-500", "text-yellow-500", "text-red-500"];

    let statusIndex = 0;
    if (value > config.thresholds[1]) statusIndex = 2;
    else if (value > config.thresholds[0]) statusIndex = 1;

    return {
      ...config,
      value: `${value.toFixed(config.decimals)}${config.unit}`,
      status: config.statusLabels[statusIndex],
      statusColor: statusColors[statusIndex],
    };
  };

  const config = getDataConfig(dataType);
  const IconComponent = config.icon;

  return (
    <div className="w-full">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full">
        {/* Mobile Layout - Icon on top */}
        <div className="block md:hidden">
          <div
            className={`bg-gradient-to-r ${config.gradient} p-2 text-white flex justify-center`}
          >
            <div className="bg-white/20 p-2 rounded-full">
              <IconComponent size={20} className="text-white" />
            </div>
          </div>
          <div className="p-2 text-center">
            <h2 className="text-xs font-medium text-gray-500">
              {config.title}
            </h2>
            <p className="text-sm font-bold text-gray-800 mt-1">
              {config.value}
            </p>
            <p className={`text-xs mt-1 ${config.statusColor}`}>
              {config.status}
            </p>
          </div>
        </div>

        {/* Desktop Layout - Icon on side */}
        <div className="hidden md:flex items-stretch">
          <div
            className={`bg-gradient-to-r ${config.gradient} p-4 text-white flex items-center`}
          >
            <div className="bg-white/20 p-3 rounded-full">
              <IconComponent size={24} className="text-white" />
            </div>
          </div>
          <div className="flex-1 p-4">
            <h2 className="text-sm font-medium text-gray-500">
              {config.title}
            </h2>
            <p className="text-2xl font-bold text-gray-800 mt-1">
              {config.value}
            </p>
            <p className={`text-xs mt-1 ${config.statusColor}`}>
              {config.status}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
