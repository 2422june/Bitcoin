import React from 'react';
import { MinuteFluctuationChart, HourPriceChart, DailyComprehensiveChart } from './ChartComponents';
import PredictionAnalysis from './PredictionAnalysis';
import BitcoinPrediction from './BitcoinPrediction';

const MainDashboard = () => {
  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 왼쪽 패널 - 차트들 */}
        <div className="space-y-6">
          <MinuteFluctuationChart />
          <HourPriceChart />
          <DailyComprehensiveChart />
        </div>

        {/* 중앙 패널 - 1분 예측 */}
        <div>
          <PredictionAnalysis />
        </div>

        {/* 오른쪽 패널 - 1분 뒤 비트코인 변동 예측 */}
        <div>
          <BitcoinPrediction />
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;

