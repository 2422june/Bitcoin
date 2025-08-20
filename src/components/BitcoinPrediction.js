import React, { useMemo, useEffect, useCallback } from 'react';
import { GaugeChart } from './ChartComponents';
import { useNow, formatNow, formatPriceKRW } from '../utils/useNow';
import { handleQuestionClick } from '../utils/actions';
import { setActualPrice, setPrevPredictedPrice, usePredictionStore } from '../store/PredictionStore';

const BitcoinPrediction = ({
  embedded = false,
  gaugeHeight = 160,
  showHeader = true,
  showTime = true,
  predictionPercent = 70, // 예측 전망 값(%)
  questionTexts = ['question-text', 'question-text', 'question-text', 'question-text'],
  onQuestionClick = handleQuestionClick,
  deltaPercent: deltaPercentProp,
}) => {
  const now = useNow(1000);
  const { dateText, second } = useMemo(() => formatNow(now), [now]);
  
  // 스토어에서 실제 가격 가져오기
  const { actualPrice } = usePredictionStore((s) => ({
    actualPrice: s.actualPrice || 165372669.46,
  }));
  
  // 60초마다 실제 가격 업데이트 함수
  const updateActualPrice = useCallback(() => {
    // 랜덤 변동률 생성 (-5% ~ +5%)
    const randomChange = (Math.random() - 0.5) * 0.1; // -5% ~ +5%
    const newPrice = actualPrice * (1 + randomChange);
    
    // 0원 이하인 경우 초기값으로 리셋
    const finalPrice = newPrice <= 0 ? 165372669.46 : newPrice;
    
    // 스토어에 실제 가격 저장
    setActualPrice(finalPrice);
  }, [actualPrice]);
  
  // 컴포넌트 마운트 시 실제 가격 초기화
  useEffect(() => {
    if (!actualPrice || actualPrice === 0) {
      setActualPrice(165372669.46);
    }
  }, [actualPrice]);
  
  // 60초마다 실제 가격 업데이트
  useEffect(() => {
    const interval = setInterval(updateActualPrice, 60000); // 60초마다
    return () => clearInterval(interval);
  }, [updateActualPrice]);
  
  // 예상 가격 계산 (실제 가격 + 예상 변동치)
  const predictedPrice = useMemo(() => {
    const changeAmount = actualPrice * (deltaPercentProp / 100);
    const newPredictedPrice = actualPrice + changeAmount;
    
    // 스토어에 예상 가격 저장
    setPrevPredictedPrice(newPredictedPrice);
    
    return newPredictedPrice;
  }, [actualPrice, deltaPercentProp]);

  const secNumber = Number(second);
  // 남은 초 기준: 5초 남으면 약하게, 1초 남으면 가장 붉게
  const dangerOpacity = secNumber <= 5 ? (6 - secNumber) / 5 : 0;

  // deltaPercent는 상위에서 관리 - 차트 전환 시 유지
  const deltaPercent = deltaPercentProp ?? 0;

  const arrow = deltaPercent > 0 ? '▲' : deltaPercent < 0 ? '▼' : '–';
  const colorClass = deltaPercent > 0 ? 'text-red-400' : deltaPercent < 0 ? 'text-blue-400' : '';
  const zeroStyle = deltaPercent === 0 ? { color: '#f0f0f0' } : undefined;

  const content = (
    <div className="relative">
      {/* 타이틀 */}
      {showHeader && (
        <>
          <h2 className="text-2xl font-bold mb-1 text-center">1분 뒤 비트코인 변동은...?</h2>
          {showTime && (
            <div className="text-center mb-4">
              <p className="text-gray-400">{dateText}</p>
            </div>
          )}
        </>
      )}

      {/* 초 표시 카드 */}
      <div className="mx-auto max-w-xl bg-black/40 border border-gray-700 rounded-xl p-6 text-center">
        <div className="mb-2">
          <span className="text-8xl font-extrabold" style={{ color: '#8026FF' }}>{second}</span>
        </div>
        <div>
          <p className={`text-2xl font-semibold ${colorClass}`} style={zeroStyle}>예측 전망: {Math.abs(deltaPercent)}% {arrow}</p>
        </div>
      </div>

      {/* 게이지 */}
      <div className="mb-1">
        <div className="w-full" style={{ height: gaugeHeight }}>
          <GaugeChart value={predictionPercent} min={0} max={100} bare />
        </div>
      </div>

      {/* 가격 */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <img src="/bitcoin-icon.svg" alt="BTC" className="w-8 h-8 object-contain" />
          <span className="text-2xl font-bold">{formatPriceKRW(predictedPrice)} KRW</span>
        </div>
      </div>

      {/* 질문 버튼 - 가로 스크롤 */}
      <div className="mt-auto overflow-x-auto">
        <div className="inline-flex gap-3 min-w-full pr-2">
          {questionTexts.map((q, idx) => (
            <button
              key={`${q}-${idx}`}
              onClick={() => onQuestionClick(q)}
              className="shrink-0 bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-lg text-sm transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* 붉은 오버레이는 메인 컨테이너에서 처리 */}
    </div>
  );

  if (embedded) {
    return <div>{content}</div>;
  }

  return (
    <div className="bg-card-bg p-6 rounded-lg border border-border-color">{content}</div>
  );
};

export default BitcoinPrediction;
