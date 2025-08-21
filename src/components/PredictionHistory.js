import React from 'react';
import { usePredictionStore } from '../store/PredictionStore';

const PredictionHistory = () => {
  const historyData = [
    { date: '2025.08.18(월)', fluctuation: '100%', accuracy: '100%' },
    { date: '2025.08.19(화)', fluctuation: '100%', accuracy: '100%' },
    { date: '2025.08.20(수)', fluctuation: '100%', accuracy: '100%' },
    { date: '2025.08.21(목)', fluctuation: '100%', accuracy: '100%' },
    { date: '2025.08.22(금)', fluctuation: '100%', accuracy: '100%' },
    { date: '2025.08.23(토)', fluctuation: '100%', accuracy: '100%' },
    { date: '2025.08.25(일)', fluctuation: '100%', accuracy: '100%' },
  ];

  // 예측 히스토리 데이터 가져오기
  const predictionHistory = usePredictionStore((s) => s.predictionHistory || []);

  return (
    <div className="mb-8">
      <div className="h-12"></div>
      <div className="h-px bg-gray-700"></div>
      <div className="h-36"></div>
      <h2 className="text-3xl font-extrabold mb-6">예측 히스토리</h2>
      {/* 예측 히스토리 섹션 */}
      <div className="mt-12">

        <div className="">
          <div className="flex">
            {/* 좌측 라벨 컬럼 */}
            <div className="flex flex-col items-start pr-8 mr-8 border-r border-border-color min-w-[90px]">
              <span className="text-3xl font-extrabold mb-16">Day</span>
              <span className="text-3xl font-extrabold">Data</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
              {predictionHistory.slice(-6).map((item, index) => (
                <div key={index} className="bg-card-bg p-4 rounded-lg border border-border-color">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-gray-400">{item.date}</span>
                    <span className={`text-xs px-2 py-1 rounded ${item.difference <= 0.5 ? 'bg-green-600 text-white' :
                        item.difference <= 1.0 ? 'bg-yellow-600 text-white' :
                          'bg-red-600 text-white'
                      }`}>
                      {Math.max(0, 100 - item.difference * 10).toFixed(0)}%
                    </span>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">예측 변동률</span>
                      <span className={`font-semibold ${item.predictedChange > 0 ? 'text-red-400' :
                          item.predictedChange < 0 ? 'text-blue-400' : 'text-gray-300'
                        }`}>
                        {item.predictedChange > 0 ? '+' : ''}{item.predictedChange.toFixed(2)}%
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-400">실제 변동률</span>
                      <span className={`font-semibold ${item.actualChange > 0 ? 'text-red-400' :
                          item.actualChange < 0 ? 'text-blue-400' : 'text-gray-300'
                        }`}>
                        {item.actualChange > 0 ? '+' : ''}{item.actualChange.toFixed(2)}%
                      </span>
                    </div>

                    <div className="flex justify-between pt-2 border-t border-gray-700">
                      <span className="text-gray-400">변동 차이</span>
                      <span className={`font-semibold ${item.difference <= 0.5 ? 'text-green-400' :
                          item.difference <= 1.0 ? 'text-yellow-400' : 'text-red-400'
                        }`}>
                        {item.difference.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {predictionHistory.length === 0 && (
                <div className="col-span-full text-center text-gray-400 py-8">
                  예측 히스토리가 없습니다.
                </div>
              )}
            </div>
          </div>

          {/* 평균 적중률 */}
          <div className="mt-8 text-right">
            <p className="text-lg font-semibold">
              최근 7일간 평균 적중률: <span className="text-violet-400">100%</span>
            </p>
          </div>
        </div>
        <div className="h-32"></div>
      </div>
    </div>
  );
};

export default PredictionHistory;
