import React from 'react';
import { GaugeChart } from './ChartComponents';

const BitcoinPrediction = ({ embedded = false, gaugeHeight = 160, showHeader = true, showTime = true }) => {
  const content = (
    <>
      {showHeader && (
        <h2 className="text-2xl font-bold mb-6 text-center">1분 뒤 비트코인 변동은...?</h2>
      )}
      {showTime && (
        <div className="text-center mb-6">
          <p className="text-gray-400">2025.11.08 - 13:03</p>
        </div>
      )}
      <div className="mx-auto max-w-xl bg-black/40 border border-gray-700 rounded-xl p-4 text-center mb-6">
        <div className="mb-3">
          <span className="text-8xl font-extrabold" style={{ color: '#8026FF' }}>32</span>
        </div>
        <div>
          <p className="text-2xl font-semibold text-red-400">예측 전망: 70% ▲</p>
        </div>
      </div>
      <div className="mb-8">
        <div className="w-full" style={{ height: gaugeHeight }}>
          <GaugeChart value={70} min={0} max={100} bare />
        </div>
      </div>
      <div className="text-center mb-6">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <img src="/bitcoin-icon.svg" alt="BTC" className="w-8 h-8 object-contain" />
          <span className="text-2xl font-bold">165,372,669.46 KRW</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mt-auto">
        <button className="bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-lg text-sm transition-colors">비트코인 관련 최신 이슈 알려줘</button>
        <button className="bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-lg text-sm transition-colors">요즘 비트코인의 변동 요인을 알려줘</button>
        <button className="bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-lg text-sm transition-colors">비트코인 현재 중요한게 뭐가 있어?</button>
        <button className="bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-lg text-sm transition-colors">비트코인 현재</button>
      </div>
    </>
  );

  if (embedded) {
    return <div>{content}</div>;
  }

  return (
    <div className="bg-card-bg p-6 rounded-lg border border-border-color">{content}</div>
  );
};

export default BitcoinPrediction;

