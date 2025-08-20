import React from 'react';
import { GaugeChart } from './ChartComponents';

const BitcoinPrediction = () => {
  return (
    <div className="bg-card-bg p-6 rounded-lg border border-border-color">
      <h2 className="text-2xl font-bold mb-6 text-center">1분 뒤 비트코인 변동은...?</h2>
      
      {/* 날짜 및 시간 */}
      <div className="text-center mb-6">
        <p className="text-gray-400">2025.11.08 - 13:03</p>
      </div>

      {/* 큰 숫자 */}
      <div className="text-center mb-6">
        <span className="text-8xl font-bold text-bitcoin-gold">32</span>
      </div>

      {/* 예측 전망 */}
      <div className="text-center mb-8">
        <p className="text-2xl font-semibold text-green-400">예측 전망: 70% ▲</p>
      </div>

      {/* 게이지 차트 (Recharts) */}
      <div className="mb-8">
        <div className="w-full" style={{ height: 160 }}>
          <GaugeChart value={70} min={0} max={100} />
        </div>
      </div>

      {/* 비트코인 가격 */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <img src="/bitcoin-icon.svg" alt="BTC" className="w-8 h-8 object-contain" />
          <span className="text-2xl font-bold">165,372,669.46 KRW</span>
        </div>
      </div>

      {/* 액션 버튼들 */}
      <div className="grid grid-cols-2 gap-3">
        <button className="bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-lg text-sm transition-colors">
          비트코인 관련 최신 이슈 알려줘
        </button>
        <button className="bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-lg text-sm transition-colors">
          요즘 비트코인의 변동 요인을 알려줘
        </button>
        <button className="bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-lg text-sm transition-colors">
          비트코인 현재 중요한게 뭐가 있어?
        </button>
        <button className="bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-lg text-sm transition-colors">
          비트코인 현재
        </button>
      </div>
    </div>
  );
};

export default BitcoinPrediction;

