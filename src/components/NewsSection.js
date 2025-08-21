import React, { useState, useEffect } from 'react';
import { usePredictionStore } from '../store/PredictionStore';
import { generateCryptoDummyNews } from '../utils/newsAPI';

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

      const isLocal = ['localhost', '127.0.0.1'].includes(window.location.hostname);
      const params = 'limit=12';
      const endpoints = [
        // 로컬 개발 서버 우선
        isLocal ? `http://localhost:8000/api/news?${params}` : null,
        // 동일 도메인 프록시/배포 환경
        `/api/news?${params}`,
        // 마지막 폴백: 기존 외부 엔드포인트
        `https://3.25.140.22/api/news?${params}`
      ].filter(Boolean);

      let fetched = false;
      let lastError = null;

      for (const url of endpoints) {
        try {
          console.log('🌐 시도 중인 엔드포인트:', url);
          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Accept': 'application/json'
            }
          });

          console.log('📡 응답 상태:', response.status, response.statusText);
          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP ${response.status}: ${response.statusText} - ${errorText}`);
          }

          const result = await response.json();
          console.log('📡 백엔드 API 응답:', result);

          if (result.success && Array.isArray(result.data) && result.data.length > 0) {
            setNews(result.data);
            setError(null);
            fetched = true;
            break;
          } else {
            lastError = new Error('백엔드에서 유효한 뉴스 데이터를 반환하지 않았습니다.');
          }
        } catch (e) {
          console.warn('⚠️ 엔드포인트 실패:', url, e.message);
          lastError = e;
          continue;
        }
      }

      if (!fetched) {
        console.warn('🟡 모든 엔드포인트 실패. 더미 뉴스로 대체합니다.');
        const dummy = generateCryptoDummyNews(12);
        setNews(dummy);
        setError(`연결 오류: ${lastError?.message || '알 수 없는 오류'} (더미 데이터 표시 중)`);
      }
    } catch (err) {
      console.error('뉴스 가져오기 오류:', err);
      const dummy = generateCryptoDummyNews(12);
      setNews(dummy);
      setError(`연결 오류: ${err.message} (더미 데이터 표시 중)`);
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
