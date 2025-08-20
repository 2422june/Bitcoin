# 비트코인 예측 대시보드

React와 Tailwind CSS를 사용하여 구축된 비트코인 예측 대시보드입니다.

## 주요 기능

- 📊 실시간 차트 (분 단위, 시간 단위, 일 단위)
- 🔮 1분 예측 분석 및 적중률 표시
- 📈 비트코인 변동 예측 게이지
- 📰 BTC 관련 뉴스 섹션
- 📅 7일간 예측 히스토리
- 🎨 다크 테마 UI

## 기술 스택

- **Frontend**: React 18
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Font**: Noto Sans KR (한국어 지원)

## 설치 및 실행

### 1. 의존성 설치

```bash
npm install
```

### 2. 뉴스 API 설정 (선택사항)

실제 뉴스를 가져오려면 CryptoCompare API 키를 설정하세요:

1. [CryptoCompare](https://www.cryptocompare.com/cryptopian/api-keys)에서 무료 계정 생성
2. API 키 발급받기 (무료 티어는 키 없이도 사용 가능)
3. 프로젝트 루트에 `.env` 파일 생성:

```bash
# .env 파일 (선택사항)
REACT_APP_CRYPTOCOMPARE_API_KEY=your_actual_api_key_here
```

**참고**: CryptoCompare는 무료 티어에서도 API 키 없이 사용할 수 있습니다. API 키가 없어도 더미 데이터로 작동합니다.

#### CryptoCompare API 특징:
- **무료 티어**: 분당 1000회 호출, API 키 불필요
- **뉴스 카테고리**: BTC, ETH, Mining, Regulation, Trading 등
- **언어 지원**: 영어, 한국어 등 (한국어 뉴스는 제한적)
- **실시간 업데이트**: 암호화폐 관련 최신 뉴스 제공
- **다양한 피드**: 주요 암호화폐 뉴스 사이트들의 뉴스 집계

### 3. 개발 서버 실행

```bash
npm start
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 4. 프로덕션 빌드

```bash
npm run build
```

## 프로젝트 구조

```
src/
├── components/
│   ├── Header.js              # 상단 헤더 (로고, 메트릭)
│   ├── ChartComponents.js     # 차트 컴포넌트들
│   ├── PredictionAnalysis.js  # 1분 예측 분석
│   ├── BitcoinPrediction.js   # 비트코인 변동 예측
│   ├── MainDashboard.js       # 메인 대시보드 레이아웃
│   ├── NewsSection.js         # BTC 뉴스 섹션
│   ├── PredictionHistory.js   # 예측 히스토리
│   └── Footer.js              # 푸터
├── App.js                     # 메인 앱 컴포넌트
├── index.js                   # 앱 진입점
└── index.css                  # 전역 스타일
```

## 커스터마이징

### 뉴스 API 설정

`src/utils/newsAPI.js`에서 CryptoCompare API 설정을 수정할 수 있습니다:

```javascript
// CryptoCompare API 설정
export const CRYPTO_API_CONFIG = {
  BASE_URL: 'https://min-api.cryptocompare.com',
  API_KEY: process.env.REACT_APP_CRYPTOCOMPARE_API_KEY,
  ENDPOINTS: {
    NEWS: '/data/v2/news/',
    NEWS_CATEGORIES: '/data/news/categories',
    NEWS_FEEDS: '/data/news/feeds'
  }
};

// 뉴스 카테고리 및 피드 설정
const queryString = createCryptoNewsQuery({
  categories: 'BTC,ETH,Regulation', // 특정 카테고리만
  feeds: 'feed1,feed2', // 특정 피드만
  lang: 'EN', // 언어 설정
  sortOrder: 'popular', // 인기순 정렬
  limit: 20 // 뉴스 개수
});
```

### 색상 테마

`tailwind.config.js`에서 색상을 수정할 수 있습니다:

```javascript
colors: {
  'bitcoin-gold': '#F7931A',    // 비트코인 골드
  'dark-bg': '#0F0F0F',        // 배경색
  'card-bg': '#1A1A1A',        // 카드 배경색
  'border-color': '#333333',    // 테두리 색상
}
```

### 차트 데이터

`ChartComponents.js`에서 차트 데이터를 수정할 수 있습니다.

## 라이선스

© 2025 Logo. All Rights Reserved.

## 면책 조항

본 웹사이트에서 제공하는 정보는 정보 제공 목적으로만 제공되며, 재무적 조언이나 법적 조언을 대체하지 않습니다. 투자 결정을 내리기 전에 항상 자체 연구를 수행하고 필요시 전문가와 상담하시기 바랍니다.

