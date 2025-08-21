import React, { useMemo } from 'react';
import { usePredictionStore } from '../store/PredictionStore';
import { getTodayAverageChange, getCurrentHourAverageChange } from '../store/PredictionStore';

const Header = () => {
  // 스토어에서 실제 가격 가져오기
  const { actualPrice } = usePredictionStore((s) => ({
    actualPrice: s.actualPrice || 165372669.46,
  }));

  // 시가 총액 계산 (실제 가격 * 100)
  const marketCap = useMemo(() => {
    const totalMarketCap = actualPrice * 100;
    // 조 단위로 변환 (1조 = 1,000,000,000,000)
    const trillion = totalMarketCap / 1000000000000;
    return trillion.toFixed(3);
  }, [actualPrice]);

  // 당일 평균 변동치 계산
  const todayAverageChange = useMemo(() => {
    return getTodayAverageChange();
  }, [actualPrice]); // actualPrice가 변경될 때마다 재계산 (60초마다)

  // 이번 시 평균 변동치 계산
  const currentHourAverageChange = useMemo(() => {
    return getCurrentHourAverageChange();
  }, [actualPrice]); // actualPrice가 변경될 때마다 재계산 (60초마다)
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
              <p className="font-semibold" style={{ color: '#F0F0F0' }}>
                {marketCap}조 <span style={{ color: '#9A26FF' }}>USD</span>
              </p>
            </div>
            <div className="text-center">
              <p className="text-gray-400">오늘의 변동치</p>
              <p className={`font-semibold ${todayAverageChange > 0 ? 'text-red-400' : todayAverageChange < 0 ? 'text-blue-400' : ''}`}>
                {Math.abs(todayAverageChange).toFixed(2)}% {todayAverageChange > 0 ? '▲' : todayAverageChange < 0 ? '▼' : '–'}
              </p>
            </div>
            <div className="text-center">
              <p className="text-gray-400">1시간 동안 변동치</p>
              <p className={`font-semibold ${currentHourAverageChange > 0 ? 'text-red-400' : currentHourAverageChange < 0 ? 'text-blue-400' : ''}`}>
                {Math.abs(currentHourAverageChange).toFixed(2)}% {currentHourAverageChange > 0 ? '▲' : currentHourAverageChange < 0 ? '▼' : '–'}
              </p>
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
