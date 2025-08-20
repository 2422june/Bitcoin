import React from 'react';

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

  return (
    <div className="mb-8">
      <div className="h-12"></div>
      <div className="h-px bg-gray-700"></div>
      <div className="h-36"></div>
      <h2 className="text-3xl font-extrabold mb-6">예측 히스토리</h2>
      <div className="h-12"></div>
      <div className="">
        <div className="flex">
          {/* 좌측 라벨 컬럼 */}
          <div className="flex flex-col items-start pr-8 mr-8 border-r border-border-color min-w-[90px]">
            <span className="text-3xl font-extrabold mb-16">Day</span>
            <span className="text-3xl font-extrabold">Data</span>
          </div>

          {/* 우측 날짜 + 데이터 카드 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-10 flex-1">
            {historyData.map((item, index) => {
              const isPositive = index === 0; // 첫 날만 녹색
              return (
                <div key={index} className="flex flex-col items-center">
                  <p className="text-[20px] font-semibold text-center mb-4">{item.date}</p>
                  <div className={`rounded-2xl text-white border border-border-color flex flex-col items-center justify-center ${isPositive ? 'bg-green-600' : 'bg-red-600'}`} style={{ width: 161, height: 85, boxShadow: '0 6px 0 rgba(255,255,255,0.08)' }}>
                    <p className="text-[16px] mb-1">변동률: {item.fluctuation}</p>
                    <p className="text-[16px]">적중률: {item.accuracy}</p>
                  </div>
                </div>
              );
            })}
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
  );
};

export default PredictionHistory;

