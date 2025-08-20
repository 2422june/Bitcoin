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

### 2. 개발 서버 실행

```bash
npm start
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 3. 프로덕션 빌드

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

