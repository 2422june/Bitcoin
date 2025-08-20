import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts';

// 분 단위 변동 차트
export const MinuteFluctuationChart = ({ height = 200, showHeader = true }) => {
  const data = [
    { time: '13:00', value: 100 },
    { time: '13:01', value: 105 },
    { time: '13:02', value: 98 },
    { time: '13:03', value: 110 },
    { time: '13:04', value: 108 },
    { time: '13:05', value: 115 },
  ];

  return (
    <div className="p-1 rounded-lg">
      {showHeader && <h3 className="text-lg font-semibold mb-4 text-center">분 단위 변동</h3>}
      <ResponsiveContainer width="100%" height={height}>
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
export const HourPriceChart = ({ height = 200, showHeader = true }) => {
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
      {showHeader && <h3 className="text-lg font-semibold mb-4 text-center">시간 단위 가격</h3>}
      <ResponsiveContainer width="100%" height={height}>
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
export const DailyComprehensiveChart = ({ height = 200, showHeader = true }) => {
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
      {showHeader && <h3 className="text-lg font-semibold mb-4 text-center">데일리 종합 차트</h3>}
      <ResponsiveContainer width="100%" height={height}>
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

// 게이지 차트 (반원)
export const GaugeChart = ({ value = 70, min = 0, max = 100, bare = false }) => {
  const safeMin = Number.isFinite(min) ? min : 0;
  const safeMax = Number.isFinite(max) && max !== min ? max : 100;
  const clamped = Math.max(safeMin, Math.min(value, safeMax));
  const percent = ((clamped - safeMin) / (safeMax - safeMin)) * 100;
  const data = [{ name: 'value', value: percent }];

  const coreChart = (
    <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          data={data}
          innerRadius="70%"
          outerRadius="100%"
          startAngle={180}
          endAngle={0}
          cx="50%"
          cy="100%"
        >
          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
          <RadialBar dataKey="value" cornerRadius={10} background fill="#F59E0B" />
        </RadialBarChart>
      </ResponsiveContainer>
  );

  if (bare) {
    return coreChart;
  }

  return (
    <div className="bg-card-bg p-4 rounded-lg border border-border-color">
      {coreChart}
      <div className="text-center mt-2 text-sm text-gray-400">약세 · 안정 · 강세</div>
    </div>
  );
};

// 적중률 막대 차트
export const AccuracyProgressChart = ({ accurate = 60, inaccurate = 40 }) => {
  const data = [{ name: '오늘', accurate, inaccurate }];
  return (
    <div className="bg-dark-bg p-4 rounded-lg">
      <ResponsiveContainer width="100%" height={100}>
        <BarChart data={data} layout="vertical" margin={{ left: 0, right: 0, top: 8, bottom: 8 }}>
          <CartesianGrid horizontal={false} vertical={false} />
          <XAxis type="number" domain={[0, 100]} hide />
          <YAxis type="category" dataKey="name" hide />
          <Tooltip contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #333' }} />
          <Bar dataKey="accurate" stackId="a" fill="#22c55e" radius={[8, 0, 0, 8]} />
          <Bar dataKey="inaccurate" stackId="a" fill="#3b82f6" radius={[0, 8, 8, 0]} />
        </BarChart>
      </ResponsiveContainer>
      <div className="flex justify-between text-sm mt-2">
        <span className="text-gray-400">정확</span>
        <span className="font-semibold">{accurate}%</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-gray-400">부정확</span>
        <span className="font-semibold">{inaccurate}%</span>
      </div>
    </div>
  );
};

// 예측 분석(또는 차트 대체 렌더) - PredictionAnalysis 통합
export const PredictionAnalysis = ({ mode = 'analysis', containerHeight }) => {
  if (mode === 'minute') {
    return <MinuteFluctuationChart height={containerHeight ? containerHeight - 16 : 260} showHeader={false} />;
  }
  if (mode === 'hour') {
    return <HourPriceChart height={containerHeight ? containerHeight - 16 : 260} showHeader={false} />;
  }
  if (mode === 'daily') {
    return <DailyComprehensiveChart height={containerHeight ? containerHeight - 16 : 260} showHeader={false} />;
  }

  return (
    <div className="bg-card-bg p-6 rounded-lg border border-border-color relative flex flex-col" style={containerHeight ? { height: containerHeight } : undefined}>
      <h2 className="text-xl font-bold">예측 분석</h2>
      <div className="text-sm text-gray-300 mt-2 pb-3 border-b border-gray-700">2025.11.08 - 13:03</div>

      <div className="mt-4 space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-300">직전 예측</span>
          <span className="text-blue-400 font-semibold">30% ▼</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-300">실제 변동</span>
          <span className="text-red-400 font-semibold">100% ▲</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-300">변동 차이</span>
          <span className="text-yellow-400 font-semibold">130%</span>
        </div>
      </div>

      {/* 하단 적중률(오늘) 영역 - 이미지처럼 얇은 막대 + 좌우 수치 */}
      <div className="mt-auto pt-6">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-gray-300">적중률(오늘)</span>
          <span className="text-gray-300">60%</span>
        </div>
        <div className="bg-gray-700 rounded-full h-4 overflow-hidden">
          <div className="h-4 w-[60%] bg-gradient-to-r from-red-500 via-purple-500 to-blue-500"></div>
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>60</span>
          <span>40</span>
        </div>
      </div>
    </div>
  );
};

