# Bitcoin Prediction Dashboard Backend

비트코인 예측 대시보드의 백엔드 API 서버입니다.

## 🚀 기능

### 📰 뉴스 API
- **GET** `/api/news` - 암호화폐 뉴스 목록
- **GET** `/api/news/categories` - 뉴스 카테고리
- **GET** `/api/news/feeds` - 뉴스 피드

### 📊 예측 API
- **GET** `/api/prediction/current` - 현재 예측
- **GET** `/api/prediction/minute` - 1분 예측 데이터
- **GET** `/api/prediction/accuracy` - 예측 정확도
- **GET** `/api/prediction/history` - 예측 히스토리
- **POST** `/api/prediction/feedback` - 예측 피드백

### 💹 시장 데이터 API
- **GET** `/api/market/current` - 현재 시장 데이터
- **GET** `/api/market/hourly` - 시간별 데이터
- **GET** `/api/market/daily` - 일별 데이터
- **GET** `/api/market/summary` - 시장 요약

## 🛠️ 설치 및 실행

### 1. 의존성 설치
```bash
npm install
```

### 2. 환경변수 설정
`.env` 파일을 생성하고 다음 내용을 입력하세요:

```env
# 서버 설정
PORT=5000
NODE_ENV=development

# 프론트엔드 URL
FRONTEND_URL=http://localhost:3000

# CryptoCompare API
CRYPTOCOMPARE_API_KEY=your_api_key_here

# 로깅 레벨
LOG_LEVEL=info
```

### 3. 개발 서버 실행
```bash
npm run dev
```

### 4. 프로덕션 서버 실행
```bash
npm start
```

## 🔧 API 사용 예시

### 뉴스 조회
```bash
curl "http://localhost:5000/api/news?limit=5&categories=BTC"
```

### 예측 데이터 조회
```bash
curl "http://localhost:5000/api/prediction/current"
```

### 시장 데이터 조회
```bash
curl "http://localhost:5000/api/market/current?fsym=BTC&tsym=USD"
```

## 📁 프로젝트 구조

```
backend/
├── routes/           # API 라우터
│   ├── news.js      # 뉴스 관련 API
│   ├── prediction.js # 예측 관련 API
│   └── marketData.js # 시장 데이터 API
├── utils/            # 유틸리티
│   └── logger.js    # 로깅 유틸리티
├── server.js         # 메인 서버 파일
├── package.json      # 프로젝트 설정
└── .env             # 환경변수 (수동 생성)
```

## 🔒 보안 기능

- **Helmet**: 보안 헤더 설정
- **CORS**: 교차 출처 리소스 공유 제한
- **Rate Limiting**: API 호출 제한 (15분당 100회)
- **Input Validation**: 입력 데이터 검증

## 📊 로깅

- **Winston**을 사용한 구조화된 로깅
- 콘솔 및 파일 출력 지원
- 에러 스택 트레이스 포함

## 🚨 에러 처리

- 모든 API 엔드포인트에 에러 핸들링
- API 실패시 더미 데이터로 폴백
- 사용자 친화적인 에러 메시지

## 🔄 폴백 시스템

- CryptoCompare API 실패시 더미 데이터 제공
- 네트워크 오류시 자동 복구
- 일관된 응답 형식 유지

## 📈 성능 최적화

- **Axios** 타임아웃 설정 (10초)
- 응답 데이터 캐싱 (향후 구현 예정)
- 효율적인 데이터 처리

## 🚀 향후 계획

- [ ] 데이터베이스 연동 (MongoDB/PostgreSQL)
- [ ] Redis 캐싱 시스템
- [ ] WebSocket 실시간 데이터
- [ ] 사용자 인증 시스템
- [ ] API 문서 (Swagger)
- [ ] 테스트 코드 작성
- [ ] Docker 컨테이너화
- [ ] CI/CD 파이프라인

## 📞 지원

문제가 발생하거나 질문이 있으시면 이슈를 등록해주세요.
