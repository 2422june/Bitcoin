import React from 'react';

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

      {/* 게이지 차트 */}
      <div className="mb-8">
        <div className="relative w-full h-32">
          {/* 게이지 배경 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-24 bg-gradient-to-r from-blue-500 via-gray-500 to-red-500 rounded-t-full"></div>
          </div>
          
          {/* 게이지 포인터 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-1 h-20 bg-white transform rotate-45 origin-bottom" style={{ transform: 'rotate(-15deg)' }}></div>
          </div>

          {/* 라벨들 */}
          <div className="absolute bottom-0 left-1/4 transform -translate-x-1/2">
            <span className="text-xs text-gray-400">취약</span>
          </div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
            <span className="text-xs text-gray-400">안정</span>
          </div>
          <div className="absolute bottom-0 right-1/4 transform translate-x-1/2">
            <span className="text-xs text-gray-400">완강</span>
          </div>
          <div className="absolute bottom-0 left-0">
            <span className="text-xs text-gray-400">약세</span>
          </div>
          <div className="absolute bottom-0 right-0">
            <span className="text-xs text-gray-400">강세</span>
          </div>
        </div>
      </div>

      {/* 비트코인 가격 */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <div className="w-8 h-8 bg-bitcoin-gold rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">₿</span>
          </div>
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

