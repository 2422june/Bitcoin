import React from 'react';

const PredictionAnalysis = () => {
  return (
    <div className="bg-card-bg p-6 rounded-lg border border-border-color">
      <h2 className="text-2xl font-bold mb-6 text-center">1분 예측</h2>
      
      {/* 예측 분석 */}
      <div className="bg-dark-bg p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold mb-4">예측 분석</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-400">날짜 및 시간:</span>
            <span className="font-medium">2025.11.08 - 13:03</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">직전 예측:</span>
            <span className="text-red-400 font-semibold">30% ▼</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">실제 변동:</span>
            <span className="text-green-400 font-semibold">100% ▲</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">변동 차이:</span>
            <span className="text-yellow-400 font-semibold">130%</span>
          </div>
        </div>
      </div>

      {/* 적중률 차트 */}
      <div>
        <h3 className="text-lg font-semibold mb-4">적중률(오늘)</h3>
        <div className="bg-dark-bg p-4 rounded-lg">
          <div className="flex items-center space-x-4 mb-2">
            <span className="text-sm text-gray-400">정확</span>
            <div className="flex-1 bg-gray-700 rounded-full h-4">
              <div className="bg-red-500 h-4 rounded-full" style={{ width: '60%' }}></div>
            </div>
            <span className="text-sm font-semibold">60%</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-400">부정확</span>
            <div className="flex-1 bg-gray-700 rounded-full h-4">
              <div className="bg-blue-500 h-4 rounded-full" style={{ width: '40%' }}></div>
            </div>
            <span className="text-sm font-semibold">40%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionAnalysis;

