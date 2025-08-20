import React, { useMemo, useState, useEffect } from 'react';
import { MinuteFluctuationChart, HourPriceChart, DailyComprehensiveChart, PredictionAnalysis } from './ChartComponents';
import BitcoinPrediction from './BitcoinPrediction';
import { useNow } from '../utils/useNow';
import { useHeaderHeight } from '../utils/useHeaderHeight';
import { setPrevPrediction, setActualChange } from '../store/PredictionStore';

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
  const [chartTitle, setChartTitle] = useState('1분 예측');

  // 변수 값들(이미지 반영): 외부 연동 전까지 임시 상태로 관리
  const [predictionPercent] = useState(70);
  const [accuracySuccess, setAccuracySuccess] = useState(60);
  const accuracyFail = Math.max(0, 100 - Math.max(0, Math.min(100, accuracySuccess)));
  const questionTexts = [
    'question-text',
    'question-text',
    'question-text',
    'question-text',
    'question-text',
  ];

  const now = useNow(1000); // 초 경계 정렬됨
  const headerHeight = useHeaderHeight();

  // 예측 증감 전망을 상위에서 관리하여 차트 전환 시값이 유지되도록 함
  const randomDelta = () => Math.floor(Math.random() * 201) - 100; // -100..100
  const [deltaPercent, setDeltaPercent] = useState(() => randomDelta());
  useEffect(() => {
    const s = now.getSeconds();
    if (s === 0) {
      // 1) 직전 예측을 전역에 저장
      setPrevPrediction(deltaPercent);

      // 2) 직전 실 변동치를 생성/저장 (임시: 난수) - 실제 연결 시 실데이터로 교체
      const actual = randomDelta();
      setActualChange(actual);

      setDeltaPercent(randomDelta());
    }
  }, [now]);

  const toggleMainView = (target) => {
    setMainView((prev) => {
      const newView = prev === target ? 'default' : target;
      
      // 차트 제목 설정
      if (newView === 'default') {
        setChartTitle('1분 예측');
      } else if (target === 'minute') {
        setChartTitle('분 단위 변동');
      } else if (target === 'hour') {
        setChartTitle('시간 단위 가격');
      } else if (target === 'daily') {
        setChartTitle('데일리 종합 차트');
      }
      
      return newView;
    });
  };

  return (
    <div className="mb-8 relative">
      {/* Chart Title */}
      <div className='h-12 text-3xl font-extrabold' style={{ color: '#9A26FF' }}>{chartTitle}</div>
      <div className="grid grid-cols-1 xl:grid-cols-[280px_1fr] gap-6 overflow-hidden relative">
        {/* 왼쪽 사이드 - 썸네일 3개 */}
        <div className="flex flex-col gap-[24px]">
          <button onClick={() => toggleMainView('minute')} className="block w-full text-left">
            <div className="bg-black/40 border border-gray-700 rounded-lg overflow-hidden" style={{ height: sideCardOuterHeight }}>
              <div className="p-3" style={{ height: sideCardOuterHeight - labelHeight }}>
                <MinuteFluctuationChart height={computedChartHeight} showHeader={false} showAxisLabels={false} data={[]} />
              </div>
              <div className="border-t border-gray-700 px-4 h-10 text-sm flex items-center">분 단위 변동</div>
            </div>
          </button>

          <button onClick={() => toggleMainView('hour')} className="block w-full text-left">
            <div className="bg-black/40 border border-gray-700 rounded-lg overflow-hidden" style={{ height: sideCardOuterHeight }}>
              <div className="p-3" style={{ height: sideCardOuterHeight - labelHeight }}>
                <HourPriceChart height={computedChartHeight} showHeader={false} showAxisLabels={false} data={[]} />
              </div>
              <div className="border-t border-gray-700 px-4 h-10 text-sm flex items-center">시간 단위 가격</div>
            </div>
          </button>

          <button onClick={() => toggleMainView('daily')} className="block w-full text-left">
            <div className="bg-black/40 border border-gray-700 rounded-lg overflow-hidden" style={{ height: sideCardOuterHeight }}>
              <div className="p-3" style={{ height: sideCardOuterHeight - labelHeight }}>
                <DailyComprehensiveChart height={computedChartHeight} showHeader={false} showAxisLabels={false} data={[]} />
              </div>
              <div className="border-t border-gray-700 px-4 h-10 text-sm flex items-center">데일리 종합 차트</div>
            </div>
          </button>
        </div>

        {/* 중앙 메인 영역 고정 높이: 584px */}
        <div className="rounded-2xl " style={{ height: MAIN_HEIGHT }}>
          {mainView === 'default' ? (
            <div className="flex items-stretch h-full border border-border-color rounded-lg">
              {/* 좌: 분석 */}
              <div className="w-[170px] bg-card-bg rounded-lg p-4 overflow-hidden">
                <PredictionAnalysis
                  mode={'analysis'}
                  containerHeight={MAIN_HEIGHT - 32}
                  accuracySuccess={accuracySuccess}
                />
              </div>
              {/* 우: 1분 뒤 변동 */}
              <div className="flex-1 rounded-lg bg-black p-4 overflow-hidden">
                <BitcoinPrediction
                  embedded
                  gaugeHeight={MAIN_HEIGHT * 0.35}
                  showTime
                  predictionPercent={predictionPercent}
                  questionTexts={questionTexts}
                  deltaPercent={deltaPercent}
                />
              </div>
            </div>
          ) : (
            <div className="rounded-lg border border-gray-700 bg-black/40 p-4 h-full">
              {mainView === 'minute' && <MinuteFluctuationChart height={MAIN_HEIGHT - 32} showHeader showAxisLabels={true} data={[]} />}
              {mainView === 'hour' && <HourPriceChart height={MAIN_HEIGHT - 32} showHeader showAxisLabels={true} data={[]} />}
              {mainView === 'daily' && <DailyComprehensiveChart height={MAIN_HEIGHT - 32} showHeader showAxisLabels={true} data={[]} />}
            </div>
          )}
        </div>
      </div>
      {/* 헤더 제외 영역 붉은 오버레이: 초 5~1 */}
      {(() => {
        // 남은 초(60->1) 기준: 5초 이하에서 오버레이, 헤더 제외 전 화면 덮기
        const current = now.getSeconds();
        const remaining = current === 0 ? 60 : 60 - current;
        const opacity = remaining <= 5 ? (6 - remaining) / 8 : 0; // 초 변화와 시각적 강도 균형
        return opacity > 0 ? (
          <div
            className="pointer-events-none fixed left-0 right-0"
            style={{ top: headerHeight, bottom: 0, backgroundColor: `rgba(239, 68, 68, ${opacity})`, zIndex: 10 }}
          />
        ) : null;
      })()}
    </div>
  );
};

export default MainDashboard;
