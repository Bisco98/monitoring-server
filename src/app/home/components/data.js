// Dummy data for sensor monitoring
export const dummySensorData = [
  {
    id: "1",
    timestamp: "2024-01-15 08:00:00",
    temperature: 28.5,
    humidity: 65.2,
    smoke: 120,
    time: "08:00",
  },
  {
    id: "2",
    timestamp: "2024-01-15 09:00:00",
    temperature: 29.1,
    humidity: 68.7,
    smoke: 135,
    time: "09:00",
  },
  {
    id: "3",
    timestamp: "2024-01-15 10:00:00",
    temperature: 31.2,
    humidity: 72.3,
    smoke: 180,
    time: "10:00",
  },
  {
    id: "4",
    timestamp: "2024-01-15 11:00:00",
    temperature: 33.8,
    humidity: 75.1,
    smoke: 220,
    time: "11:00",
  },
  {
    id: "5",
    timestamp: "2024-01-15 12:00:00",
    temperature: 36.2,
    humidity: 78.9,
    smoke: 280,
    time: "12:00",
  },
  {
    id: "6",
    timestamp: "2024-01-15 13:00:00",
    temperature: 38.5,
    humidity: 82.4,
    smoke: 350,
    time: "13:00",
  },
  {
    id: "7",
    timestamp: "2024-01-15 14:00:00",
    temperature: 35.7,
    humidity: 79.2,
    smoke: 290,
    time: "14:00",
  },
  {
    id: "8",
    timestamp: "2024-01-15 15:00:00",
    temperature: 33.1,
    humidity: 76.8,
    smoke: 240,
    time: "15:00",
  },
  {
    id: "9",
    timestamp: "2024-01-15 16:00:00",
    temperature: 30.9,
    humidity: 73.5,
    smoke: 190,
    time: "16:00",
  },
  {
    id: "10",
    timestamp: "2024-01-15 17:00:00",
    temperature: 29.3,
    humidity: 70.1,
    smoke: 155,
    time: "17:00",
  },
  {
    id: "11",
    timestamp: "2024-01-15 18:00:00",
    temperature: 27.8,
    humidity: 67.3,
    smoke: 125,
    time: "18:00",
  },
  {
    id: "12",
    timestamp: "2024-01-15 19:00:00",
    temperature: 26.5,
    humidity: 64.7,
    smoke: 110,
    time: "19:00",
  },
  {
    id: "13",
    timestamp: "2024-01-15 20:00:00",
    temperature: 25.9,
    humidity: 62.1,
    smoke: 95,
    time: "20:00",
  },
  {
    id: "14",
    timestamp: "2024-01-15 21:00:00",
    temperature: 25.2,
    humidity: 60.5,
    smoke: 85,
    time: "21:00",
  },
  {
    id: "15",
    timestamp: "2024-01-15 22:00:00",
    temperature: 24.8,
    humidity: 59.2,
    smoke: 80,
    time: "22:00",
  },
];

export const getRecentData = (count = 10) => {
  return dummySensorData.slice(-count);
};

export const getAllData = () => {
  return dummySensorData;
};
