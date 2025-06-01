import React from "react";
import { Thermometer, Droplets, Cloud } from "lucide-react";

export default function Card({ dataType = "temperature", sensorData, config }) {
  const sensorConfigs = {
    temperature: {
      title: "Temperature",
      dataKey: "temperature",
      unit: "°C",
      decimals: 1,
      icon: Thermometer,
      gradient: "from-red-500 to-red-600",
    },
    humidity: {
      title: "Humidity",
      dataKey: "humidity",
      unit: "%",
      decimals: 1,
      icon: Droplets,
      gradient: "from-blue-500 to-blue-600",
    },
    smoke: {
      title: "Gas Level",
      dataKey: "smoke",
      unit: " ppm",
      decimals: 0,
      icon: Cloud,
      gradient: "from-yellow-500 to-yellow-600",
    },
  };

  const getDataConfig = (type) => {
    const sensorConfig = sensorConfigs[type] || sensorConfigs.temperature;
    const value = sensorData[sensorConfig.dataKey];
    const statusColors = ["text-green-500", "text-red-500"]; // Only 2 colors: safe and danger

    // Use Firebase config thresholds and labels directly
    const firebaseThreshold = config[type]?.thresholds || 0;
    const firebaseLabels = config[type]?.statusLabels || ["Aman", "Bahaya"];

    // Simple logic: below or above threshold
    let statusIndex = 0;
    if (value > firebaseThreshold) statusIndex = 1; // Above threshold = danger

    return {
      ...sensorConfig,
      value: `${value.toFixed(sensorConfig.decimals)}${sensorConfig.unit}`,
      status: firebaseLabels[statusIndex],
      statusColor: statusColors[statusIndex],
    };
  };

  const cardConfig = getDataConfig(dataType);
  const IconComponent = cardConfig.icon;

  return (
    <div className="w-full">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full">
        {/* Mobile Layout - Icon on top */}
        <div className="block md:hidden">
          <div
            className={`bg-gradient-to-r ${cardConfig.gradient} p-2 text-white flex justify-center`}
          >
            <div className="bg-white/20 p-2 rounded-full">
              <IconComponent size={20} className="text-white" />
            </div>
          </div>
          <div className="p-2 text-center">
            <h2 className="text-xs font-medium text-gray-500">
              {cardConfig.title}
            </h2>
            <p className="text-sm font-bold text-gray-800 mt-1">
              {cardConfig.value}
            </p>
            <p className={`text-xs mt-1 ${cardConfig.statusColor}`}>
              {cardConfig.status}
            </p>
          </div>
        </div>

        {/* Desktop Layout - Icon on side */}
        <div className="hidden md:flex items-stretch">
          <div
            className={`bg-gradient-to-r ${cardConfig.gradient} p-4 text-white flex items-center`}
          >
            <div className="bg-white/20 p-3 rounded-full">
              <IconComponent size={24} className="text-white" />
            </div>
          </div>
          <div className="flex-1 p-4">
            <h2 className="text-sm font-medium text-gray-500">
              {cardConfig.title}
            </h2>
            <p className="text-2xl font-bold text-gray-800 mt-1">
              {cardConfig.value}
            </p>
            <p className={`text-xs mt-1 ${cardConfig.statusColor}`}>
              {cardConfig.status}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
