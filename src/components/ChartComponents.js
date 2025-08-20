import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// 분 단위 변동 차트
export const MinuteFluctuationChart = () => {
  const data = [
    { time: '13:00', value: 100 },
    { time: '13:01', value: 105 },
    { time: '13:02', value: 98 },
    { time: '13:03', value: 110 },
    { time: '13:04', value: 108 },
    { time: '13:05', value: 115 },
  ];

  return (
    <div className="bg-card-bg p-4 rounded-lg border border-border-color">
      <h3 className="text-lg font-semibold mb-4 text-center">분 단위 변동</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="time" stroke="#666" />
          <YAxis stroke="#666" />
          <Tooltip contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #333' }} />
          <Line type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2} dot={{ fill: '#3B82F6' }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

// 시간 단위 가격 차트
export const HourPriceChart = () => {
  const data = [
    { hour: '09:00', price: 100, volume: 50 },
    { hour: '10:00', price: 105, volume: 60 },
    { hour: '11:00', price: 98, volume: 45 },
    { hour: '12:00', price: 110, volume: 70 },
    { hour: '13:00', price: 108, volume: 55 },
    { hour: '14:00', price: 115, volume: 80 },
  ];

  return (
    <div className="bg-card-bg p-4 rounded-lg border border-border-color">
      <h3 className="text-lg font-semibold mb-4 text-center">시간 단위 가격</h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="hour" stroke="#666" />
          <YAxis stroke="#666" />
          <Tooltip contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #333' }} />
          <Bar dataKey="price" fill="#10B981" />
          <Bar dataKey="volume" fill="#EF4444" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// 데일리 종합 차트
export const DailyComprehensiveChart = () => {
  const data = [
    { day: '월', price: 100, volume: 1000 },
    { day: '화', price: 105, volume: 1200 },
    { day: '수', price: 98, volume: 900 },
    { day: '목', price: 110, volume: 1400 },
    { day: '금', price: 108, volume: 1100 },
    { day: '토', price: 115, volume: 1600 },
    { day: '일', price: 112, volume: 1300 },
  ];

  return (
    <div className="bg-card-bg p-4 rounded-lg border border-border-color">
      <h3 className="text-lg font-semibold mb-4 text-center">데일리 종합 차트</h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="day" stroke="#666" />
          <YAxis stroke="#666" />
          <Tooltip contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #333' }} />
          <Bar dataKey="price" fill="#8B5CF6" />
          <Bar dataKey="volume" fill="#F59E0B" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

