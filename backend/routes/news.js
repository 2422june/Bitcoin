const express = require('express');
const router = express.Router();
const axios = require('axios');

// CoinDesk RSS 피드 설정 (실제 뉴스)
const COINDESK_RSS_CONFIG = {
  BASE_URL: 'https://www.coindesk.com',
  RSS_FEEDS: [
    '/arc/outboundfeeds/rss/',
    '/arc/outboundfeeds/rss/?outputType=xml',
    '/feed/',
    '/rss/'
  ]
};

// 실제 뉴스 우선순위 설정
const NEWS_PRIORITY = {
  PRIMARY: 'coindesk_rss',  // CoinDesk RSS (실제 뉴스)
  FALLBACK: 'fallback'      // 폴백 뉴스 (RSS 실패시)
};

// 실제 뉴스 소스들
const NEWS_SOURCES = [
  'coindesk.com',
  'cointelegraph.com',
  'decrypt.co',
  'theblock.co',
  'bitcoinmagazine.com'
];

// RSS 피드에서 뉴스 데이터 추출 함수
const parseRSSFeed = async (rssUrl) => {
  try {
    console.log('📡 RSS 피드 호출:', rssUrl);
    
    const response = await axios.get(rssUrl, {
      timeout: 15000,
      headers: {
        'User-Agent': 'Bitcoin-Prediction-Backend/1.0',
        'Accept': 'application/xml, text/xml'
      }
    });
    
    const xmlData = response.data;
    console.log('📊 RSS 데이터 수신:', xmlData.length, 'bytes');
    
         // 간단한 XML 파싱 (정규식 사용) - CDATA 지원
     const articles = [];
     const itemRegex = /<item>([\s\S]*?)<\/item>/g;
     const titleRegex = /<title>(?:<!\[CDATA\[(.*?)\]\]>|(.*?))<\/title>/;
     const linkRegex = /<link>(.*?)<\/link>/;
     const descriptionRegex = /<description>(?:<!\[CDATA\[(.*?)\]\]>|(.*?))<\/description>/;
     const pubDateRegex = /<pubDate>(.*?)<\/pubDate>/;
    
    let match;
    while ((match = itemRegex.exec(xmlData)) !== null && articles.length < 12) {
      const itemContent = match[1];
      
             // 정규식 매칭 결과에서 CDATA 또는 일반 텍스트 추출
       const titleMatch = titleRegex.exec(itemContent);
       const linkMatch = linkRegex.exec(itemContent);
       const descriptionMatch = descriptionRegex.exec(itemContent);
       const pubDateMatch = pubDateRegex.exec(itemContent);
       
       let title = '제목 없음';
       let link = '#';
       let description = '';
       let pubDate = new Date().toISOString();
       
       // title 처리 (CDATA 또는 일반 텍스트)
       if (titleMatch) {
         title = (titleMatch[1] || titleMatch[2] || '제목 없음').trim();
       }
       
       // link 처리
       if (linkMatch) {
         link = (linkMatch[1] || '#').trim();
       }
       
       // description 처리 (CDATA 또는 일반 텍스트)
       if (descriptionMatch) {
         description = (descriptionMatch[1] || descriptionMatch[2] || '').trim();
       }
       
       // pubDate 처리
       if (pubDateMatch) {
         pubDate = (pubDateMatch[1] || new Date().toISOString()).trim();
       }
       
       // HTML 엔티티 정리
       title = title
         .replace(/&amp;/g, '&')                   // &amp; → &
         .replace(/&lt;/g, '<')                    // &lt; → <
         .replace(/&gt;/g, '>')                    // &gt; → >
         .replace(/&quot;/g, '"')                  // &quot; → "
         .replace(/&#39;/g, "'")                   // &#39; → '
         .trim();
       
       description = description
         .replace(/&amp;/g, '&')                   // &amp; → &
         .replace(/&lt;/g, '<')                    // &lt; → <
         .replace(/&gt;/g, '>')                    // &gt; → >
         .replace(/&quot;/g, '"')                  // &quot; → "
         .replace(/&#39;/g, "'")                   // &#39; → '
         .trim();
       
       // description이 비어있거나 너무 짧으면 title을 사용
       if (!description || description.trim().length < 10) {
         description = title;
       }
      
             // 비트코인/암호화폐 관련 뉴스 필터링 (더 포괄적으로)
       const titleLower = title.toLowerCase();
       const descLower = description.toLowerCase();
       
       if (titleLower.includes('bitcoin') || 
           descLower.includes('bitcoin') ||
           titleLower.includes('crypto') ||
           descLower.includes('crypto') ||
           titleLower.includes('blockchain') ||
           descLower.includes('blockchain') ||
           titleLower.includes('ethereum') ||
           descLower.includes('ethereum') ||
           titleLower.includes('defi') ||
           descLower.includes('defi') ||
           titleLower.includes('nft') ||
           descLower.includes('nft')) {
         
         articles.push({
           id: `rss-${articles.length + 1}`,
           title: title,
           description: description,
           url: link,
           publishedAt: pubDate,
           source: { name: 'CoinDesk' },
           author: 'CoinDesk',
           imageUrl: null
         });
       }
    }
    
    console.log(`✅ RSS에서 ${articles.length}개의 비트코인 뉴스 추출`);
    return articles;
    
  } catch (error) {
    console.error('❌ RSS 피드 파싱 오류:', error.message);
    return [];
  }
};







// GET /api/news - 뉴스 목록 조회
router.get('/', async (req, res) => {
  try {
    const { categories, feeds, lang, sortOrder, limit } = req.query;
    
    console.log('📰 뉴스 API 호출:', { categories, feeds, lang, sortOrder, limit });
    
         // CoinDesk RSS 피드에서 뉴스 가져오기 (여러 피드 시도)
     let articles = [];
     let lastError = null;
     
     for (let i = 0; i < COINDESK_RSS_CONFIG.RSS_FEEDS.length; i++) {
       const rssUrl = `${COINDESK_RSS_CONFIG.BASE_URL}${COINDESK_RSS_CONFIG.RSS_FEEDS[i]}`;
       console.log(`🔗 CoinDesk RSS URL ${i + 1} 시도:`, rssUrl);
       
       try {
         articles = await parseRSSFeed(rssUrl);
         
         if (articles && articles.length > 0) {
           console.log(`✅ RSS 피드 ${i + 1}에서 ${articles.length}개의 뉴스 추출 성공`);
           break;
         }
       } catch (rssError) {
         console.log(`⚠️ RSS 피드 ${i + 1} 실패:`, rssError.message);
         lastError = rssError;
         continue;
       }
     }
     
     if (articles && articles.length > 0) {
       console.log('✅ RSS에서 실제 뉴스 데이터 반환:', articles.length, '개');
       res.json({
         success: true,
         data: articles,
         timestamp: new Date().toISOString()
       });
     } else {
       console.log('⚠️ 모든 RSS 피드에서 뉴스 데이터 없음');
       console.error('🔍 마지막 RSS 에러:', {
         status: lastError?.response?.status,
         data: lastError?.response?.data,
         message: lastError?.message
       });
       
       // 모든 RSS 실패시 에러 응답
       res.status(500).json({
         success: false,
         data: [],
         error: `모든 RSS 피드 호출 실패: ${lastError?.message || '알 수 없는 오류'}`,
         timestamp: new Date().toISOString()
       });
     }

  } catch (error) {
    console.error('❌ 뉴스 API 오류:', error.message);
    console.error('🔍 에러 상세:', {
      code: error.code,
      response: error.response?.status,
      message: error.response?.data || error.message,
      stack: error.stack?.split('\n')[0]
    });
    
    // 에러 발생시 에러 메시지만 반환
    console.log('🔄 에러 발생 - 에러 응답 반환');
    res.status(500).json({
      success: false,
      data: [],
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// GET /api/news/categories - 뉴스 카테고리 조회
router.get('/categories', async (req, res) => {
  try {
    // CoinDesk는 카테고리 API가 없으므로 기본 카테고리 반환
    const categories = [
      { id: 'BTC', name: 'Bitcoin', description: '비트코인 관련 뉴스' },
      { id: 'General', name: 'General', description: '일반 암호화폐 뉴스' },
      { id: 'Market', name: 'Market', description: '시장 동향 뉴스' },
      { id: 'Technology', name: 'Technology', description: '기술 관련 뉴스' }
    ];
    
    res.json({
      success: true,
      data: categories,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('카테고리 API 오류:', error.message);
    res.status(500).json({
      success: false,
      error: '카테고리를 가져오는데 실패했습니다.',
      timestamp: new Date().toISOString()
    });
  }
});

// GET /api/news/feeds - 뉴스 피드 조회
router.get('/feeds', async (req, res) => {
  try {
    // CoinDesk는 피드 API가 없으므로 기본 피드 정보 반환
    const feeds = [
      { id: 'coindesk', name: 'CoinDesk', description: 'CoinDesk 공식 뉴스' },
      { id: 'bitcoin', name: 'Bitcoin', description: '비트코인 전용 뉴스' }
    ];
    
    res.json({
      success: true,
      data: feeds,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('피드 API 오류:', error.message);
    res.status(500).json({
      success: false,
      error: '피드를 가져오는데 실패했습니다.',
      timestamp: new Date().toISOString()
    });
  }
});

module.exports = router;
