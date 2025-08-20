import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts';
import { useNow, formatNow, formatPriceKRW } from '../utils/useNow';
import { usePredictionStore } from '../store/PredictionStore';

// 분 단위 변동 차트
export const MinuteFluctuationChart = ({ height = 200, showHeader = true, showAxisLabels = false, data = [] }) => {
  // 스토어에서 실제 분별 변동 데이터 가져오기
  const { minuteFluctuationData } = usePredictionStore((s) => ({
    minuteFluctuationData: s.minuteFluctuationData || []
  }));

  // 실제 데이터가 있으면 사용, 없으면 빈 배열
  const chartData = data.length > 0 ? data : minuteFluctuationData;

  return (
    <div className="p-1 rounded-lg flex items-center justify-center h-full">
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="time" stroke="#666" domain={[0, 60]} hide={!showAxisLabels} />
          <YAxis stroke="#666" domain={[-100, 100]} hide={!showAxisLabels} />
          <Tooltip contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #333' }} />
          <Line type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2} dot={{ fill: '#3B82F6' }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

// 시간 단위 가격 차트
export const HourPriceChart = ({ height = 200, showHeader = true, showAxisLabels = false, data = [] }) => {
  // 스토어에서 실제 시간별 가격 데이터 가져오기
  const { hourlyPriceData } = usePredictionStore((s) => ({
    hourlyPriceData: s.hourlyPriceData || []
  }));

  // 실제 데이터가 있으면 사용, 없으면 빈 배열
  const chartData = data.length > 0 ? data : hourlyPriceData;

  return (
    <div className="p-1 rounded-lg flex items-center justify-center h-full">
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="hour" stroke="#666" hide={!showAxisLabels} />
          <YAxis stroke="#666" hide={!showAxisLabels} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #333' }}
            formatter={(value, name, props) => [
              `${formatPriceKRW(value)} KRW`,
              '가격'
            ]}
            labelFormatter={(label) => `시간: ${label}`}
          />
          <Bar dataKey="price" fill="#10B981" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// 데일리 종합 차트
export const DailyComprehensiveChart = ({ height = 200, showHeader = true, showAxisLabels = false, data = [] }) => {
  // 스토어에서 실제 일별 가격 데이터 가져오기
  const { dailyPriceData } = usePredictionStore((s) => ({
    dailyPriceData: s.dailyPriceData || []
  }));

  // 실제 데이터가 있으면 사용, 없으면 빈 배열
  const chartData = data.length > 0 ? data : dailyPriceData;

  return (
    <div className="p-1 rounded-lg flex items-center justify-center h-full">
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="day" stroke="#666" hide={!showAxisLabels} />
          <YAxis stroke="#666" hide={!showAxisLabels} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #333' }}
            formatter={(value, name) => [
              `${formatPriceKRW(value)} KRW`,
              name
            ]}
            labelFormatter={(label) => `날짜: ${label}`}
          />
          <Bar dataKey="startPrice" fill="#8B5CF6" name="시작가" />
          <Bar dataKey="middlePrice" fill="#F59E0B" name="중간가" />
          <Bar dataKey="endPrice" fill="#EF4444" name="마감가" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// 게이지 차트 (반원) - 값만큼 그라데이션 채움, 나머지는 회색
export const GaugeChart = ({
  value = 70,
  min = 0,
  max = 100,
  bare = false,
  unfilledColor = '#3f3f46', // 회색(남은 구간)
}) => {
  const safeMin = Number.isFinite(min) ? min : 0;
  const safeMax = Number.isFinite(max) && max !== min ? max : 100;
  const clamped = Math.max(safeMin, Math.min(value, safeMax));
  const percent = ((clamped - safeMin) / (safeMax - safeMin)) * 100;

  // 스택 형태로: 채워진 구간 + 남은 구간
  const data = [
    {
      name: 'gauge',
      filled: Math.max(0, Math.min(100, percent)),
      remaining: Math.max(0, 100 - Math.max(0, Math.min(100, percent))),
    },
  ];

  const chart = (
    <div className="relative w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          data={data}
          innerRadius="72%"
          outerRadius="90%"
          startAngle={180}
          endAngle={0}
          cx="50%"
          cy="100%"
        >
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2E26FF" />
              <stop offset="50%" stopColor="#9A26FF" />
              <stop offset="100%" stopColor="#FF0A5B" />
            </linearGradient>
          </defs>
          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
          {/* 남은 구간(회색) */}
          <RadialBar
            dataKey="remaining"
            stackId="gauge"
            fill={unfilledColor}
            cornerRadius={10}
            background={false}
          />
          {/* 채워진 구간(그라데이션) */}
          <RadialBar
            dataKey="filled"
            stackId="gauge"
            fill="url(#gaugeGradient)"
            cornerRadius={10}
            background={false}
          />
        </RadialBarChart>
      </ResponsiveContainer>

      {/* 라벨: 이미지 유사 배치 */}
      <div className="pointer-events-none absolute inset-0 select-none">
        <div className="absolute left-[272px] bottom-3 text-gray-400 text-[28px] font-extrabold">취약</div>
        <div className="absolute left-[18%] top-[16%] -translate-x-1/2 text-gray-400 text-[28px] font-extrabold">약세</div>
        <div className="absolute left-1/2 -translate-x-1/2 top-0 text-gray-400 text-[28px] font-extrabold">안정</div>
        <div className="absolute right-[18%] top-[16%] translate-x-1/2 text-pink-500 text-[28px] font-extrabold">강세</div>
        <div className="absolute right-2 bottom-5 text-gray-400 text-[28px] font-extrabold">완강</div>
        {/* 하단 중앙 포인트 */}
        <div className="absolute left-1/2 bottom-1 -translate-x-1/2 w-6 h-6 rounded-full" style={{ backgroundColor: '#d4d4d4' }} />
      </div>
    </div>
  );

  if (bare) {
    return chart;
  }

  return (
    <div className="bg-card-bg p-4 rounded-lg border border-border-color">
      {chart}
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
export const PredictionAnalysis = ({ mode = 'analysis', containerHeight, accuracySuccess = 60 }) => {
  // 훅은 최상위에서 무조건 호출
  const now = useNow(1000);
  const { dateText } = formatNow(now);
  const { prevPrediction, actualChange, difference, prevPredictedPrice, actualPrice } = usePredictionStore((s) => ({
    prevPrediction: s.prevPrediction,
    actualChange: s.actualChange,
    difference: s.difference,
    prevPredictedPrice: s.prevPredictedPrice,
    actualPrice: s.actualPrice,
  }));

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
    <div className="relative flex flex-col" style={containerHeight ? { height: containerHeight } : undefined}>
      <h2 className="text-xl font-bold">예측 분석</h2>
      <div className="text-sm text-gray-300 mt-2 pb-3 border-b border-gray-700">{dateText}</div>

      <div className="mt-4 space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-300">직전 예측</span>
          <span className={prevPrediction > 0 ? 'text-red-400 font-semibold' : prevPrediction < 0 ? 'text-blue-400 font-semibold' : 'font-semibold'}>
            {Math.abs(prevPrediction)}% {prevPrediction > 0 ? '▲' : prevPrediction < 0 ? '▼' : '–'}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-300">실제 변동</span>
          <span className={actualChange > 0 ? 'text-red-400 font-semibold' : actualChange < 0 ? 'text-blue-400 font-semibold' : 'font-semibold'}>
            {Math.abs(actualChange)}% {actualChange > 0 ? '▲' : actualChange < 0 ? '▼' : '–'}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-300">이전 예상 가격</span>
          <span className="font-semibold">{formatPriceKRW(prevPredictedPrice)} KRW</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-300">실제 가격</span>
          <span className="font-semibold">{formatPriceKRW(actualPrice)} KRW</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-300">변동 차이</span>
          <span className="font-semibold">{Math.round(difference)}%</span>
        </div>
      </div>

      {/* 하단 적중률(오늘) 영역 - 얇은 막대 + 좌우 수치 */}
      <div className="mt-auto border-t border-gray-700 pt-6">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-gray-300">적중률(오늘)</span>
          <span className="text-gray-300">{Math.max(0, Math.min(100, accuracySuccess))}%</span>
        </div>
        <div className="bg-gray-700 rounded-full h-4 overflow-hidden">
          <div className="h-4 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500" style={{ width: `${Math.max(0, Math.min(100, accuracySuccess))}%` }}></div>
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>{Math.max(0, Math.min(100, accuracySuccess))}</span>
          <span>{Math.max(0, 100 - Math.max(0, Math.min(100, accuracySuccess)))}</span>
        </div>
      </div>
    </div>
  );
};
