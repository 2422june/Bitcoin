// 암호화폐 뉴스 API 관련 유틸리티 함수들

// CryptoCompare API 설정
export const CRYPTO_API_CONFIG = {
  BASE_URL: 'https://min-api.cryptocompare.com',
  API_KEY: process.env.REACT_APP_CRYPTOCOMPARE_API_KEY, // 선택사항 (무료 티어는 키 불필요)
  ENDPOINTS: {
    NEWS: '/data/v2/news/',
    NEWS_CATEGORIES: '/data/news/categories',
    NEWS_FEEDS: '/data/news/feeds'
  }
};

// CryptoCompare 뉴스 쿼리 생성
export const createCryptoNewsQuery = (options = {}) => {
  const {
    categories = 'ALL', // ALL, BTC, ETH, Mining, Regulation 등
    feeds = 'ALL', // ALL, feed1, feed2 등
    lang = 'EN', // EN, KR, CN, JP 등
    sortOrder = 'latest', // latest, popular
    limit = 12
  } = options;

  const params = new URLSearchParams({
    categories,
    feeds,
    lang,
    sortOrder,
    limit: limit.toString()
  });

  // API 키가 있으면 추가
  if (CRYPTO_API_CONFIG.API_KEY) {
    params.append('api_key', CRYPTO_API_CONFIG.API_KEY);
  }

  return params.toString();
};

// CryptoCompare 뉴스 데이터 정제
export const sanitizeCryptoNewsData = (newsData) => {
  if (!newsData || !newsData.Data || !Array.isArray(newsData.Data)) return [];
  
  return newsData.Data.map(article => ({
    id: article.id || Math.random().toString(36).substr(2, 9),
    title: article.title || '제목 없음',
    description: article.body || article.summary || '',
    url: article.url || article.guid || '#',
    publishedAt: article.published_on ? new Date(article.published_on * 1000).toISOString() : new Date().toISOString(),
    source: {
      name: article.source || article.source_info?.name || '알 수 없음'
    },
    author: article.author || '작성자 없음',
    imageUrl: article.imageurl || null,
    categories: article.categories || [],
    tags: article.tags || []
  }));
};

// CryptoCompare API 에러 처리
export const handleCryptoAPIError = (error) => {
  console.error('CryptoCompare API 오류:', error);
  
  if (error.Response === 'Error') {
    if (error.Message.includes('rate limit')) {
      return 'API 호출 한도를 초과했습니다. 잠시 후 다시 시도해주세요.';
    } else if (error.Message.includes('unauthorized')) {
      return 'API 키가 유효하지 않습니다.';
    } else {
      return error.Message || '뉴스를 가져오는데 실패했습니다.';
    }
  } else if (error.status === 'serverError') {
    return '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
  } else {
    return '뉴스를 가져오는데 실패했습니다.';
  }
};

// CryptoCompare 더미 뉴스 데이터 생성
export const generateCryptoDummyNews = (count = 12) => {
  const dummyTitles = [
    '비트코인 ETF 승인으로 인한 시장 변동성 증가',
    '글로벌 중앙은행들의 디지털 화폐 정책 동향',
    '비트코인 채굴 난이도 조정 및 해시레이트 변화',
    '기관 투자자들의 암호화폐 시장 진입 확대',
    '규제 기관의 암호화폐 정책 업데이트',
    'DeFi 프로토콜의 보안 이슈 및 대응 방안',
    'NFT 시장의 새로운 트렌드와 투자 기회',
    '메타버스와 암호화폐의 융합 발전',
    '환경 친화적 채굴 방식의 확산',
    '크로스체인 브리지 기술의 발전',
    '암호화폐 결제 시스템의 상용화 확대',
    '블록체인 기술의 산업별 적용 사례'
  ];

  // 실제 암호화폐 뉴스 사이트들
  const dummyUrls = [
    'https://cointelegraph.com/tags/bitcoin',
    'https://coindesk.com/tag/bitcoin/',
    'https://www.coindesk.com/tech/',
    'https://decrypt.co/news',
    'https://www.theblock.co/latest',
    'https://www.newsbtc.com/',
    'https://bitcoinmagazine.com/',
    'https://www.bitcoininsider.org/',
    'https://www.bitcoin.com/news/',
    'https://www.bitcoinist.com/',
    'https://www.bitcoinnews.com/',
    'https://www.bitcoin.org/en/news'
  ];

  return Array(count).fill(null).map((_, index) => ({
    id: `dummy-${index + 1}`,
    title: dummyTitles[index] || `비트코인 관련 최신 뉴스 ${index + 1}`,
    description: `비트코인 시장 동향 및 최신 소식에 대한 요약 내용입니다. 이 뉴스는 더미 데이터입니다.`,
    url: dummyUrls[index] || 'https://www.google.com/search?q=bitcoin+news',
    publishedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
    source: { name: '더미 뉴스' },
    author: '시스템',
    imageUrl: null,
    categories: ['BTC', 'General'],
    tags: ['비트코인', '시장동향']
  }));
};
