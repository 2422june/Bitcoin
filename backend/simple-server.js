const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// CORS 설정
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true
}));

// JSON 파싱
app.use(express.json());

// 간단한 뉴스 데이터
const dummyNews = [
  {
    id: '1',
    title: '비트코인 ETF 승인으로 인한 시장 변동성 증가',
    description: '비트코인 시장 동향 및 최신 소식에 대한 요약 내용입니다.',
    url: 'https://cointelegraph.com/tags/bitcoin',
    publishedAt: new Date().toISOString(),
    source: { name: '더미 뉴스' },
    author: '시스템',
    categories: ['BTC', 'General'],
    tags: ['비트코인', '시장동향']
  },
  {
    id: '2',
    title: '글로벌 중앙은행들의 디지털 화폐 정책 동향',
    description: '중앙은행 디지털 화폐(CBDC) 정책 동향 분석',
    url: 'https://coindesk.com/tag/bitcoin/',
    publishedAt: new Date().toISOString(),
    source: { name: '더미 뉴스' },
    author: '시스템',
    categories: ['CBDC', 'Policy'],
    tags: ['중앙은행', '정책']
  }
];

// 헬스 체크
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    message: '간단한 백엔드 서버가 실행 중입니다!'
  });
});

// 뉴스 API
app.get('/api/news', (req, res) => {
  console.log('📰 뉴스 API 호출됨');
  res.json({
    success: true,
    data: dummyNews,
    source: 'Simple Backend Server',
    timestamp: new Date().toISOString()
  });
});

// 루트 경로
app.get('/', (req, res) => {
  res.json({
    message: 'Bitcoin Prediction Backend API',
    endpoints: {
      health: '/health',
      news: '/api/news'
    },
    timestamp: new Date().toISOString()
  });
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`🚀 간단한 백엔드 서버가 포트 ${PORT}에서 실행 중입니다.`);
  console.log(`💚 헬스 체크: http://localhost:${PORT}/health`);
  console.log(`📰 뉴스 API: http://localhost:${PORT}/api/news`);
  console.log(`🌐 프론트엔드: http://localhost:3000`);
});

module.exports = app;

