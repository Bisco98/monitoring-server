'use client';
import { useState, useEffect } from 'react';
import { Gauge, Thermometer, Droplets, Cloud, Home, Info } from 'lucide-react';
import { ref, onValue } from 'firebase/database';
import { database } from '@/config/firebase';

export default function HomePage() {
    const [sensorData, setSensorData] = useState({
        temperature: 0,
        humidity: 0,
        smoke: 0,
    });

    useEffect(() => {
        const dbRef = ref(database, 'terkini'); // sesuaikan dengan path di Firebase
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
        <div className="min-h-screen bg-gray-100">
            {/* Mobile Navigation */}
            <nav className="bg-white shadow-md fixed top-0 w-full z-10">
                <div className="px-4 py-3">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <Thermometer className="h-6 w-6 text-red-500" />
                            <span className="ml-2 text-lg font-bold text-gray-800">
                                Monitoring Suhu
                            </span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <a href="#" className="p-2 rounded-full hover:bg-gray-100">
                                <Home className="h-5 w-5 text-gray-600" />
                            </a>
                            <a href="#" className="p-2 rounded-full hover:bg-gray-100">
                                <Info className="h-5 w-5 text-gray-600" />
                            </a>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content with padding for fixed nav */}
            <div className="pt-16 px-4 pb-4">
                <div className="max-w-full mx-auto">
                    <div className="flex flex-nowrap justify-center gap-4 overflow-x-auto pb-2">
                        {/* Temperature Card */}
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden w-[300px] flex-shrink-0">
                            <div className="flex items-stretch">
                                <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 text-white flex items-center">
                                    <div className="bg-white/20 p-3 rounded-full">
                                        <Thermometer size={24} className="text-white" />
                                    </div>
                                </div>
                                <div className="flex-1 p-4">
                                    <h2 className="text-sm font-medium text-gray-500">Temperature</h2>
                                    <p className="text-2xl font-bold text-gray-800 mt-1">
                                        {sensorData.temperature.toFixed(1)}°C
                                    </p>
                                    <p className={`text-xs mt-1 ${
                                        sensorData.temperature > 28 ? 'text-red-500' : 
                                        sensorData.temperature > 25 ? 'text-yellow-500' : 'text-green-500'
                                    }`}>
                                        {sensorData.temperature > 28 ? 'Suhu Tinggi' : 
                                         sensorData.temperature > 25 ? 'Suhu Normal' : 'Suhu Rendah'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Humidity Card */}
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden w-[300px] flex-shrink-0">
                            <div className="flex items-stretch">
                                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-white flex items-center">
                                    <div className="bg-white/20 p-3 rounded-full">
                                        <Droplets size={24} className="text-white" />
                                    </div>
                                </div>
                                <div className="flex-1 p-4">
                                    <h2 className="text-sm font-medium text-gray-500">Humidity</h2>
                                    <p className="text-2xl font-bold text-gray-800 mt-1">
                                        {sensorData.humidity.toFixed(1)}%
                                    </p>
                                    <p className={`text-xs mt-1 ${
                                        sensorData.humidity > 70 ? 'text-red-500' : 
                                        sensorData.humidity > 60 ? 'text-yellow-500' : 'text-green-500'
                                    }`}>
                                        {sensorData.humidity > 70 ? 'Kelembaban Tinggi' : 
                                         sensorData.humidity > 60 ? 'Kelembaban Normal' : 'Kelembaban Rendah'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Gas Level Card */}
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden w-[300px] flex-shrink-0">
                            <div className="flex items-stretch">
                                <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-4 text-white flex items-center">
                                    <div className="bg-white/20 p-3 rounded-full">
                                        <Cloud size={24} className="text-white" />
                                    </div>
                                </div>
                                <div className="flex-1 p-4">
                                    <h2 className="text-sm font-medium text-gray-500">Gas Level</h2>
                                    <p className="text-2xl font-bold text-gray-800 mt-1">
                                        {sensorData.smoke.toFixed(0)} ppm
                                    </p>
                                    <p className={`text-xs mt-1 ${
                                        sensorData.smoke > 50 ? 'text-red-500' : 
                                        sensorData.smoke > 30 ? 'text-yellow-500' : 'text-green-500'
                                    }`}>
                                        {sensorData.smoke > 50 ? 'Bahaya' : 
                                         sensorData.smoke > 30 ? 'Waspada' : 'Aman'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Metrics Card */}
                    <div className="mt-4 max-w-[600px] mx-auto">
                        <div className="bg-white rounded-lg shadow-md">
                            <div className="p-4 grid grid-cols-2 gap-4">
                                <div className="flex flex-col items-center">
                                    <Droplets className="text-blue-500 mb-1" size={24} />
                                    <p className="text-base font-semibold">{sensorData.humidity.toFixed(1)}%</p>
                                    <p className="text-xs text-gray-500">Kelembaban</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <Thermometer className="text-red-500 mb-1" size={24} />
                                    <p className="text-base font-semibold">{sensorData.temperature.toFixed(1)}°C</p>
                                    <p className="text-xs text-gray-500">Suhu</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <Cloud className="text-orange-500 mb-1" size={24} />
                                    <p className="text-base font-semibold">{sensorData.smoke.toFixed(0)}</p>
                                    <p className="text-xs text-gray-500">Gas Level</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <Gauge className="text-yellow-500 mb-1" size={24} />
                                    <p className="text-base font-semibold">
                                        {(sensorData.smoke / 100 * 10).toFixed(2)}
                                    </p>
                                    <p className="text-xs text-gray-500">Indeks Gas</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}