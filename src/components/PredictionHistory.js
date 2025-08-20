import React from 'react';

const PredictionHistory = () => {
  const historyData = [
    { date: '2025.08.18(월)', fluctuation: '100%', accuracy: '100%' },
    { date: '2025.08.19(화)', fluctuation: '100%', accuracy: '100%' },
    { date: '2025.08.20(수)', fluctuation: '100%', accuracy: '100%' },
    { date: '2025.08.21(목)', fluctuation: '100%', accuracy: '100%' },
    { date: '2025.08.22(금)', fluctuation: '100%', accuracy: '100%' },
    { date: '2025.08.23(토)', fluctuation: '100%', accuracy: '100%' },
    { date: '2025.08.24(일)', fluctuation: '100%', accuracy: '100%' },
  ];

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-6">예측 히스토리</h2>
      
      <div className="bg-card-bg p-6 rounded-lg border border-border-color">
        {/* 날짜 행 */}
        <div className="grid grid-cols-7 gap-4 mb-4">
          {historyData.map((item, index) => (
            <div key={index} className="text-center">
              <p className="text-sm text-gray-400 mb-2">{item.date}</p>
            </div>
          ))}
        </div>

        {/* 데이터 행 */}
        <div className="grid grid-cols-7 gap-4">
          {historyData.map((item, index) => (
            <div key={index} className="text-center">
              <div className="bg-green-600 p-3 rounded-lg">
                <p className="text-xs text-white mb-1">변동률: {item.fluctuation}</p>
                <p className="text-xs text-white">적중률: {item.accuracy}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 평균 적중률 */}
        <div className="mt-6 text-right">
          <p className="text-lg font-semibold text-bitcoin-gold">
            최근 7일간 평균 적중률: 100%
          </p>
        </div>
      </div>
    </div>
  );
};

export default PredictionHistory;

