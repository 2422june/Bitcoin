const axios = require('axios');

// CryptoCompare API 설정
const CRYPTO_API_CONFIG = {
  BASE_URL: 'https://min-api.cryptocompare.com',
  API_KEY: 'abcd1ee5e61ab2b61e200bc5ecb4f90205ddbab79c1580e94e62ce6ed06fef13',
  ENDPOINTS: {
    NEWS: '/data/v2/news/',
    NEWS_CATEGORIES: '/data/news/categories',
    NEWS_FEEDS: '/data/news/feeds'
  }
};

// API 연결 테스트
async function testAPIConnection() {
  console.log('🧪 CryptoCompare API 연결 테스트 시작...\n');
  
  try {
    // 1. API 키 확인
    console.log('🔑 API 키 상태:', CRYPTO_API_CONFIG.API_KEY ? `설정됨 (${CRYPTO_API_CONFIG.API_KEY.substring(0, 10)}...)` : '설정되지 않음');
    
    // 2. 뉴스 API 호출
    console.log('\n📰 뉴스 API 테스트...');
    const newsResponse = await axios.get(
      `${CRYPTO_API_CONFIG.BASE_URL}${CRYPTO_API_CONFIG.ENDPOINTS.NEWS}?categories=ALL&feeds=ALL&lang=EN&sortOrder=latest&limit=5&api_key=${CRYPTO_API_CONFIG.API_KEY}`,
      {
        timeout: 15000,
        headers: {
          'User-Agent': 'Bitcoin-Prediction-Backend/1.0',
          'Accept': 'application/json'
        }
      }
    );
    
    if (newsResponse.data && newsResponse.data.Data) {
      console.log('✅ 뉴스 API 연결 성공!');
      console.log(`📊 받은 뉴스 개수: ${newsResponse.data.Data.length}`);
      console.log('📰 첫 번째 뉴스:', newsResponse.data.Data[0]?.title || '제목 없음');
    } else {
      console.log('⚠️ 뉴스 API 응답은 있지만 데이터가 없음');
    }
    
    // 3. 카테고리 API 호출
    console.log('\n🏷️ 카테고리 API 테스트...');
    const categoryResponse = await axios.get(
      `${CRYPTO_API_CONFIG.BASE_URL}${CRYPTO_API_CONFIG.ENDPOINTS.NEWS_CATEGORIES}`,
      { timeout: 10000 }
    );
    
    if (categoryResponse.data) {
      console.log('✅ 카테고리 API 연결 성공!');
      console.log('📊 카테고리 데이터:', Object.keys(categoryResponse.data).length, '개');
    }
    
    console.log('\n🎉 모든 API 테스트 완료!');
    
  } catch (error) {
    console.error('❌ API 테스트 실패:', error.message);
    console.error('🔍 에러 상세:', {
      code: error.code,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    
    if (error.response?.status === 401) {
      console.log('\n💡 해결 방법: API 키가 유효하지 않습니다. 새로운 API 키를 발급받아주세요.');
    } else if (error.response?.status === 429) {
      console.log('\n💡 해결 방법: API 호출 한도를 초과했습니다. 잠시 후 다시 시도해주세요.');
    } else if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 해결 방법: 네트워크 연결을 확인해주세요.');
    }
  }
}

// 테스트 실행
testAPIConnection();
