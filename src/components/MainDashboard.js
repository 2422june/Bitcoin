import React, { useMemo, useState } from 'react';
import { MinuteFluctuationChart, HourPriceChart, DailyComprehensiveChart, PredictionAnalysis } from './ChartComponents';
import BitcoinPrediction from './BitcoinPrediction';

const MainDashboard = () => {
  // 중앙 메인 영역 높이를 고정(584px). 좌측 썸네일 3개의 전체(각 높이*3 + 간격*2)도 584px로 일치시킴
  const MAIN_HEIGHT = 584;
  const SIDE_GAP = 24; // px
  const cardCount = 3;
  const sideCardOuterHeight = useMemo(() => (MAIN_HEIGHT - SIDE_GAP * (cardCount - 1)) / cardCount, [MAIN_HEIGHT]);
  // 썸네일 카드의 내부 레이아웃 여백: chartPaddingY(=24) + labelHeight(=40)
  const chartPaddingY = 24;
  const labelHeight = 40;
  const computedChartHeight = Math.max(0, sideCardOuterHeight - (chartPaddingY + labelHeight));

  // 메인 카드 렌더 모드: default(분석+1분예측) | minute | hour | daily
  const [mainView, setMainView] = useState('default');

  const toggleMainView = (target) => {
    setMainView((prev) => (prev === target ? 'default' : target));
  };

  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 xl:grid-cols-[280px_1fr] gap-6 overflow-hidden">
        {/* 왼쪽 사이드 - 썸네일 3개 */}
        <div className="flex flex-col gap-[24px]">
          <button onClick={() => toggleMainView('minute')} className="block w-full text-left">
            <div className="bg-black/40 border border-gray-700 rounded-lg overflow-hidden" style={{ height: sideCardOuterHeight }}>
              <div className="p-3" style={{ height: sideCardOuterHeight - labelHeight }}>
                <MinuteFluctuationChart height={computedChartHeight} showHeader={false} />
              </div>
              <div className="border-t border-gray-700 px-4 h-10 text-sm flex items-center">분 단위 변동</div>
            </div>
          </button>

          <button onClick={() => toggleMainView('hour')} className="block w-full text-left">
            <div className="bg-black/40 border border-gray-700 rounded-lg overflow-hidden" style={{ height: sideCardOuterHeight }}>
              <div className="p-3" style={{ height: sideCardOuterHeight - labelHeight }}>
                <HourPriceChart height={computedChartHeight} showHeader={false} />
              </div>
              <div className="border-t border-gray-700 px-4 h-10 text-sm flex items-center">시간 단위 가격</div>
            </div>
          </button>

          <button onClick={() => toggleMainView('daily')} className="block w-full text-left">
            <div className="bg-black/40 border border-gray-700 rounded-lg overflow-hidden" style={{ height: sideCardOuterHeight }}>
              <div className="p-3" style={{ height: sideCardOuterHeight - labelHeight }}>
                <DailyComprehensiveChart height={computedChartHeight} showHeader={false} />
              </div>
              <div className="border-t border-gray-700 px-4 h-10 text-sm flex items-center">데일리 종합 차트</div>
            </div>
          </button>
        </div>

        {/* 중앙 메인 영역 고정 높이: 584px */}
        <div className="rounded-2xl border border-border-color bg-card-bg p-4" style={{ height: MAIN_HEIGHT }}>
          {mainView === 'default' ? (
            <div className="flex gap-6 items-stretch h-full">
              {/* 좌: 분석 */}
              <div className="w-[360px] rounded-lg border border-gray-700 bg-black/40 p-4 overflow-hidden">
                <PredictionAnalysis mode={'analysis'} containerHeight={MAIN_HEIGHT - 32} />
              </div>
              {/* 우: 1분 뒤 변동 */}
              <div className="flex-1 rounded-lg border border-gray-700 bg-black/40 p-4 overflow-hidden">
                <BitcoinPrediction embedded gaugeHeight={MAIN_HEIGHT * 0.35} showTime={false} />
              </div>
            </div>
          ) : (
            <div className="rounded-lg border border-gray-700 bg-black/40 p-4 h-full">
              {mainView === 'minute' && <MinuteFluctuationChart height={MAIN_HEIGHT - 32} showHeader />}
              {mainView === 'hour' && <HourPriceChart height={MAIN_HEIGHT - 32} showHeader />}
              {mainView === 'daily' && <DailyComprehensiveChart height={MAIN_HEIGHT - 32} showHeader />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;

