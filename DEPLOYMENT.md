# 🚀 Flask를 이용한 Bitcoin Prediction Dashboard 배포 가이드

## 📋 개요

이 프로젝트는 React 프론트엔드와 Flask 백엔드를 통합한 Bitcoin Prediction Dashboard입니다.

## 🏗️ 아키텍처

```
React Frontend (build/) ← Flask Server (app.py) ← CoinDesk RSS API
```

## 🛠️ 설치 및 실행

### 1단계: Python 환경 설정

```bash
# Python 3.8+ 설치 확인
python --version

# 가상환경 생성 (선택사항)
python -m venv venv

# 가상환경 활성화
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate
```

### 2단계: 의존성 설치

```bash
pip install -r requirements.txt
# 또는
pip install Flask requests
```

### 3단계: React 앱 빌드

```bash
npm install
npm run build
```

### 4단계: Flask 서버 실행

```bash
python app.py
```

## 🌐 서버 접속

- **메인 페이지**: http://localhost:5000
- **뉴스 API**: http://localhost:5000/api/news
- **시장 데이터 API**: http://localhost:5000/api/market-data
- **헬스 체크**: http://localhost:5000/health

## 📁 프로젝트 구조

```
Bitcoin/
├── app.py                 # Flask 메인 서버
├── requirements.txt       # Python 의존성
├── build/                # React 빌드 파일 (npm run build 후 생성)
├── src/                  # React 소스 코드
├── public/               # React 정적 파일
└── DEPLOYMENT.md         # 이 파일
```

## 🔧 주요 기능

### 백엔드 API
- **뉴스 API**: CoinDesk RSS 피드에서 비트코인 뉴스 수집
- **시장 데이터**: 더미 시장 데이터 제공
- **정적 파일 서빙**: React 빌드 파일 서빙

### RSS 피드 처리
- CDATA 태그 제거
- HTML 엔티티 정리
- 비트코인 관련 뉴스 필터링
- 폴백 시스템 (여러 RSS 피드 시도)

## 🚀 프로덕션 배포

### 1. Gunicorn 사용 (Linux/macOS)

```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

### 2. Waitress 사용 (Windows)

```bash
pip install waitress
waitress-serve --host=0.0.0.0 --port=5000 app:app
```

### 3. Docker 사용

```dockerfile
FROM python:3.9-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
RUN npm install && npm run build

EXPOSE 5000
CMD ["python", "app.py"]
```

## 🔍 문제 해결

### 포트 충돌
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/macOS
lsof -i :5000
kill -9 <PID>
```

### 의존성 문제
```bash
pip install --upgrade pip
pip install -r requirements.txt --force-reinstall
```

### React 빌드 문제
```bash
rm -rf build/
npm run build
```

## 📊 모니터링

### 로그 확인
Flask 서버는 콘솔에 상세한 로그를 출력합니다:
- 📡 RSS 피드 호출 상태
- 📊 데이터 수신 정보
- ✅ 성공/실패 상태
- ⚠️ 경고 및 오류

### 헬스 체크
```bash
curl http://localhost:5000/health
```

## 🔐 보안 고려사항

- 프로덕션에서는 `debug=False` 설정
- 환경 변수로 민감한 정보 관리
- HTTPS 사용 권장
- CORS 설정 확인

## 📈 확장 가능성

- Redis 캐싱 추가
- 데이터베이스 연동
- 사용자 인증 시스템
- 실시간 웹소켓 연결
- 로드 밸런싱

## 📞 지원

문제가 발생하면 다음을 확인하세요:
1. Python 버전 (3.8+)
2. Node.js 버전 (14+)
3. 포트 5000 사용 가능 여부
4. 인터넷 연결 상태 (RSS 피드 접근용)
