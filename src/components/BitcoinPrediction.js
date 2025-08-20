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
  questionTexts = ['비트코인 관련 최신 이슈 알려줘', '요즘 비트코인의 변동 요인을 알려줘', '비트코인 현재 중요한게 뭐가 있어?'],
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

  // -100부터 100사이의 영역을 나누는 변수 4개
  const zone1 = -100; // 취약 영역 시작
  const zone2 = -50;  // 약세 영역 시작
  const zone3 = 0;    // 안정 영역 시작
  const zone4 = 50;   // 강세 영역 시작
  const zone5 = 100;  // 완강 영역 끝

  // 각 라벨의 기본 색상과 활성화 색상
  const labelColors = {
    취약: { default: 'text-gray-400', active: 'text-blue-400' },
    약세: { default: 'text-gray-400', active: 'text-blue-600' },
    안정: { default: 'text-gray-400', active: 'text-purple-400' },
    강세: { default: 'text-gray-400', active: 'text-pink-400' },
    완강: { default: 'text-gray-400', active: 'text-red-400' }
  };

  // 예측 전망에 따른 라벨 색상 결정
  const getLabelColor = (label) => {
    const colors = labelColors[label];
    if (!colors) return 'text-gray-400';

    // 예측 전망이 해당 영역에 들어가면 활성화 색상 적용
    if (label === '취약' && deltaPercent >= zone1 && deltaPercent < zone2) return colors.active;
    if (label === '약세' && deltaPercent >= zone2 && deltaPercent < zone3) return colors.active;
    if (label === '안정' && deltaPercent >= zone3 && deltaPercent < zone4) return colors.active;
    if (label === '강세' && deltaPercent >= zone4 && deltaPercent < zone5) return colors.active;
    if (label === '완강' && deltaPercent >= zone5) return colors.active;

    return colors.default;
  };

  const arrow = deltaPercent > 0 ? '▲' : deltaPercent < 0 ? '▼' : '–';
  const colorClass = deltaPercent > 0 ? 'text-red-400' : deltaPercent < 0 ? 'text-blue-400' : '';
  const zeroStyle = deltaPercent === 0 ? { color: '#f0f0f0' } : undefined;

  const minDgree = 0;
  const maxDgree = 180;
  const areaDgreeMin = 0;
  const areaDgreeMax = 180;
  const getDgree = () => {
    return (deltaPercent + 100) * 180 / 200;
  }

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
      <div className="mx-auto max-w-xs bg-black/40 border border-gray-700 rounded-xl p-4 text-center">
        <div className="mb-2">
          <span className="text-5xl font-extrabold" style={{ color: '#8026FF' }}>{second}</span>
        </div>
        <div>
          <p className={`text-xl font-semibold ${colorClass}`} style={zeroStyle}>예측 전망: {Math.abs(deltaPercent)}% {arrow}</p>
        </div>
      </div>

      {/* 예측 전망 계기판 - 이미지로 대체 */}
      <div className="mb-4 mt-8">
        <div className="w-[550px] h-[200px] mx-auto relative">
          {/* 계기판 이미지 */}
          <img
            src="https://ifh.cc/g/k1FrLN.png"
            alt="예측 전망 계기판"
            className="w-full h-full object-contain"
          />

          {/* 라벨들 - 이미지와 정확히 매칭 */}
          <div className="absolute inset-0 pointer-events-none select-none">
            {/* 안정 (중앙 상단) */}
            <div className={`absolute left-1/2 -translate-x-1/2 top-[-10px] text-[24px] font-bold ${getLabelColor('안정')}`}>
              안정
            </div>

            {/* 약세 (왼쪽 중간) */}
            <div className={`absolute left-[100px] top-[50px] text-[24px] font-bold ${getLabelColor('약세')}`}>
              약세
            </div>

            {/* 강세 (오른쪽 중간) */}
            <div className={`absolute right-[100px] top-[50px] text-[24px] font-bold ${getLabelColor('강세')}`}>
              강세
            </div>

            {/* 취약 (왼쪽 하단) */}
            <div className={`absolute left-[40px] bottom-2 text-[24px] font-bold ${getLabelColor('취약')}`}>
              취약
            </div>

            {/* 완강 (오른쪽 하단) */}
            <div className={`absolute right-[40px] bottom-2 text-[24px] font-bold ${getLabelColor('완강')}`}>
              완강
            </div>
          </div>

          {/* 고정된 바늘 */}
          <div className="absolute inset-0 pointer-events-none select-none">
            {/* 바늘 이미지 */}
            <img
              src="https://ifh.cc/g/OzTObX.png"
              alt="바늘"
              className="absolute"
                             style={{
                 left: '50%',
                 top: '92%',
                 transform: `translateX(-100%) rotate(${getDgree}deg)`,
                 width: '150px',
                 height: '15px',
                 transformOrigin: 'right center',
                 transition: 'transform 0.8s cubic-bezier(0.4, 0.0, 0.2, 1)'
               }}
            />
          </div>
        </div>
      </div>

      {/* 가격 */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <img src="/bitcoin-icon.svg" alt="BTC" className="w-8 h-8 object-contain" />
          <span className="text-2xl font-bold">{formatPriceKRW(predictedPrice)} KRW</span>
        </div>
      </div>

      {/* 질문 버튼 - 가로 스크롤 */}
      <div className="w-[800px] m-auto mt-[45px]">
        <div className="inline-flex gap-3 min-w-full pr-2">
          <button className="bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm transition-colors flex items-center justify-center"
            style={{
              width: '237px',
              height: '26px',
              minWidth: '237px'
            }}>
            비트코인 관련 최신 이슈 알려줘
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm transition-colors flex items-center justify-center"
            style={{
              width: '237px',
              height: '26px',
              minWidth: '237px'
            }}>
            요즘 비트코인의 변동 요인을 알려줘
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm transition-colors flex items-center justify-center"
            style={{
              width: '237px',
              height: '26px',
              minWidth: '237px'
            }}>
            비트코인 현재 중요한게 뭐가 있어?
          </button>
        </div>
      </div>

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
