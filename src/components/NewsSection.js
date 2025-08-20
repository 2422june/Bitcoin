import React, { useState, useEffect } from 'react';
import { 
  CRYPTO_API_CONFIG, 
  createCryptoNewsQuery, 
  sanitizeCryptoNewsData, 
  handleCryptoAPIError, 
  generateCryptoDummyNews 
} from '../utils/newsAPI';

const NewsSection = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // CryptoCompare API 쿼리 생성
      const queryString = createCryptoNewsQuery({
        categories: 'ALL', // 모든 카테고리
        feeds: 'ALL', // 모든 피드
        lang: 'EN', // 영어 (한국어 지원 안함)
        sortOrder: 'latest', // 최신순
        limit: 12
      });

      const response = await fetch(
        `${CRYPTO_API_CONFIG.BASE_URL}${CRYPTO_API_CONFIG.ENDPOINTS.NEWS}?${queryString}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(handleCryptoAPIError(errorData));
      }

      const data = await response.json();
      
      if (data.Data && data.Data.length > 0) {
        const sanitizedNews = sanitizeCryptoNewsData(data);
        setNews(sanitizedNews);
      } else {
        console.warn('뉴스 데이터가 없습니다. 더미 데이터를 사용합니다.');
        setNews(generateCryptoDummyNews());
      }
    } catch (err) {
      console.error('뉴스 가져오기 오류:', err);
      setError(err.message);
      // 오류 발생시 더미 데이터 사용
      setNews(generateCryptoDummyNews());
    } finally {
      setLoading(false);
    }
  };

  // 뉴스 클릭 처리 함수
  const handleNewsClick = (article) => {
    if (article.url && article.url !== '#') {
      // 새 탭에서 뉴스 페이지 열기
      window.open(article.url, '_blank', 'noopener,noreferrer');
      
      // 클릭 로그 (선택사항)
      console.log('뉴스 클릭:', {
        title: article.title,
        url: article.url,
        source: article.source?.name,
        timestamp: new Date().toISOString()
      });
    } else {
      // URL이 없는 경우 알림
      alert('이 뉴스는 더미 데이터입니다. 실제 뉴스를 가져오려면 API 키를 설정해주세요.');
    }
  };



  // 날짜 포맷팅
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="mb-8">
        <div className="flex items-center mb-6">
          <h2 className="text-2xl font-bold">BTC 뉴스</h2>
          <span className="text-gray-400 ml-2">&gt;</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array(12).fill(null).map((_, index) => (
            <div key={index} className="bg-card-bg p-4 rounded-lg border border-border-color animate-pulse">
              <div className="h-4 bg-gray-700 rounded mb-2"></div>
              <div className="h-3 bg-gray-700 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <h2 className="text-2xl font-bold">BTC 뉴스</h2>
          <span className="text-gray-400 ml-2">&gt;</span>
        </div>
        <button 
          onClick={fetchNews}
          className="bg-bitcoin-gold hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
        >
          새로고침
        </button>
      </div>

      {error && (
        <div className="bg-red-900/20 border border-red-500 text-red-400 p-3 rounded-lg mb-4">
          ⚠️ {error} - 더미 데이터를 표시합니다.
        </div>
      )}
      
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
           {news.map((article, index) => (
             <div 
               key={article.id || index} 
               className="bg-card-bg p-4 rounded-lg border border-border-color hover:border-bitcoin-gold hover:shadow-lg hover:shadow-bitcoin-gold/20 transition-all duration-300 cursor-pointer group transform hover:-translate-y-1"
               onClick={() => handleNewsClick(article)}
               title="클릭하여 뉴스 보기"
             >
               <h3 className="text-sm text-gray-300 mb-2 line-clamp-2 group-hover:text-white transition-colors">
                 {article.title}
               </h3>
               {article.description && (
                 <p className="text-xs text-gray-500 mb-2 line-clamp-2">
                   {article.description}
                 </p>
               )}
               <div className="flex justify-between items-center">
                 <span className="text-bitcoin-gold text-xs font-medium group-hover:text-yellow-400 transition-colors flex items-center gap-1">
                   <span>바로가기</span>
                   <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                   </svg>
                 </span>
                 <span className="text-xs text-gray-400">
                   {formatDate(article.publishedAt)}
                 </span>
               </div>
               {article.source?.name && (
                 <p className="text-xs text-gray-500 mt-1">
                   출처: {article.source.name}
                 </p>
               )}
               {/* 카테고리 태그 표시 */}
               {article.categories && article.categories.length > 0 && (
                 <div className="flex flex-wrap gap-1 mt-2">
                   {article.categories.slice(0, 3).map((category, catIndex) => (
                     <span 
                       key={catIndex}
                       className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full"
                     >
                       {category}
                     </span>
                   ))}
                 </div>
               )}
             </div>
           ))}
         </div>
    </div>
  );
};

export default NewsSection;

