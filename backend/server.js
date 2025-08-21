const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');

// 환경변수 로드
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// 미들웨어
app.use(helmet()); // 보안 헤더
app.use(morgan('combined')); // 로깅

// CORS 설정
app.use(cors({
  origin: [
    'http://localhost:3000', 
    'http://127.0.0.1:3000', 
    'http://localhost:3001',
    'http://localhost:3002',
    'http://127.0.0.1:3001',
    'http://127.0.0.1:3002',
    'https://bitcoin-azure.vercel.app/'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
  optionsSuccessStatus: 200
}));

// CORS 디버깅 미들웨어
app.use((req, res, next) => {
  console.log('🌐 요청 정보:', {
    method: req.method,
    url: req.url,
    origin: req.headers.origin,
    userAgent: req.headers['user-agent'],
    timestamp: new Date().toISOString()
  });
  next();
});
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate Limiting (간단한 버전)
app.use('/api/', (req, res, next) => {
  // 간단한 요청 제한 (15분당 100회)
  const clientIP = req.ip;
  if (!req.app.locals.requestCount) {
    req.app.locals.requestCount = {};
  }
  
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15분
  
  if (!req.app.locals.requestCount[clientIP]) {
    req.app.locals.requestCount[clientIP] = { count: 0, resetTime: now + windowMs };
  }
  
  if (now > req.app.locals.requestCount[clientIP].resetTime) {
    req.app.locals.requestCount[clientIP] = { count: 0, resetTime: now + windowMs };
  }
  
  if (req.app.locals.requestCount[clientIP].count >= 100) {
    return res.status(429).json({
      error: '너무 많은 요청이 발생했습니다. 15분 후에 다시 시도해주세요.'
    });
  }
  
  req.app.locals.requestCount[clientIP].count++;
  next();
});

// 라우터
const newsRoutes = require('./routes/news');
const marketDataRoutes = require('./routes/marketData');

app.use('/api/news', newsRoutes);
app.use('/api/market', marketDataRoutes);

// 헬스 체크
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// 404 처리
app.use('*', (req, res) => {
  res.status(404).json({ error: 'API 엔드포인트를 찾을 수 없습니다.' });
});

// 에러 핸들러
app.use((err, req, res, next) => {
  console.error('서버 오류:', err);
  res.status(500).json({ 
    error: '서버 내부 오류가 발생했습니다.',
    message: process.env.NODE_ENV === 'development' ? err.message : '알 수 없는 오류'
  });
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`🚀 백엔드 서버가 포트 ${PORT}에서 실행 중입니다.`);
  console.log(`📊 API 문서: http://localhost:${PORT}/api`);
  console.log(`💚 헬스 체크: http://localhost:${PORT}/health`);
});

module.exports = app;
