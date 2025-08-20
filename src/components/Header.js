import React from 'react';

const Header = () => {
  return (
    <header className="z-10 sticky top-0 bg-card-bg border-b border-border-color">
      <div className="max-w-[1420px] container mx-auto py-4">
        <div className="flex justify-between items-center">
          {/* 로고 및 타이틀 */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">
              <img src="/bitcoin-icon.svg" alt="Bitcoin" className="w-10 h-10 object-contain" />
            </div>
            <h1 className="text-xl font-bold">최고가 되는 순간 코인 타임</h1>
          </div>

          {/* 주요 메트릭 */}
          <div className="flex items-center space-x-6 text-sm">
            <div className="text-center">
              <p className="text-gray-400">시가 총액</p>
              <p className="font-semibold" style={{ color: '#F0F0F0' }}>4.051조 USD</p>
            </div>
            <div className="text-center">
              <p className="text-gray-400">오늘의 변동치</p>
              <p className="text-red-400 font-semibold">100% ▲</p>
            </div>
            <div className="text-center">
              <p className="text-gray-400">1시간 동안 변동치</p>
              <p className="text-blue-400 font-semibold">100% ▼</p>
            </div>
            <div className="text-center">
              <p className="text-gray-400">1분전 변동치</p>
              <p className="font-semibold">100% -</p>
            </div>
            <div className="text-center">
              <p className="text-gray-400">오늘의 적중률</p>
              <p className="font-semibold" style={{ color: '#8026FF' }}>60%</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
