import React, { useState, useEffect } from 'react';
import { usePredictionStore } from '../store/PredictionStore';

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
      
      console.log('🚀 백엔드 API 호출 시작');
      
      // 백엔드 API 호출
      const response = await fetch('http://3.25.140.22:8000/api/news?limit=12', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Origin': window.location.origin
        },
        mode: 'cors',
        credentials: 'omit'
      });

      console.log('📡 응답 상태:', response.status, response.statusText);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ HTTP 오류:', response.status, errorText);
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('📡 백엔드 API 응답:', result);
      
      if (result.success && result.data && result.data.length > 0) {
        console.log('✅ 백엔드에서 뉴스 데이터 반환');
        setNews(result.data);
        setError(null);
      } else {
        console.warn('⚠️ 백엔드 데이터 없음');
        setError('뉴스 데이터를 가져올 수 없습니다.');
      }
    } catch (err) {
      console.error('뉴스 가져오기 오류:', err);
      setError(`연결 오류: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // 뉴스 클릭 처리 함수
  const handleNewsClick = (article) => {
    console.log('🖱️ 뉴스 클릭:', {
      title: article.title,
      url: article.url,
      source: article.source?.name
    });
    
    if (article.url && article.url !== '#' && article.url !== '') {
      // 새 탭에서 실제 뉴스 페이지 열기
      window.open(article.url, '_blank', 'noopener,noreferrer');
    } else {
      console.warn('⚠️ 유효하지 않은 URL:', article.url);
      alert('이 뉴스의 링크가 유효하지 않습니다.');
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
    <div className="h-12"></div>
    <div className="h-px bg-gray-700"></div>
    <div className="h-36"></div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <h2 className="text-2xl font-bold">BTC 뉴스</h2>
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
           ⚠️ {error}
           <button 
             onClick={fetchNews}
             className="ml-3 text-red-300 hover:text-white underline"
           >
             다시 시도
           </button>
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
                               

             </div>
           ))}
         </div>
    </div>
  );
};

export default NewsSection;
