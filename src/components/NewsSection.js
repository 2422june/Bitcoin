import React from 'react';

const NewsSection = () => {
  const newsItems = Array(12).fill(null).map((_, index) => ({
    id: index + 1,
    headline: "미국 비트코인 최근 뉴스 헤드라인",
    link: "바로가기"
  }));

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <h2 className="text-2xl font-bold">BTC 뉴스</h2>
        <span className="text-gray-400 ml-2">&gt;</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {newsItems.map((news) => (
          <div key={news.id} className="bg-card-bg p-4 rounded-lg border border-border-color hover:border-bitcoin-gold transition-colors cursor-pointer">
            <p className="text-sm text-gray-300 mb-2">{news.headline}</p>
            <span className="text-bitcoin-gold text-xs font-medium">{news.link}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsSection;

