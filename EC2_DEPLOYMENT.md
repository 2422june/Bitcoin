# 🚀 EC2 서버에서 Bitcoin Prediction Dashboard 배포 가이드

## 📋 개요

AWS EC2 인스턴스에서 Flask 기반 Bitcoin Prediction Dashboard를 프로덕션 환경으로 배포하는 방법입니다.

## 🔐 1단계: EC2 보안 그룹 설정

### 보안 그룹 규칙 추가:
```
인바운드 규칙:
- SSH (22): 0.0.0.0/0 (또는 특정 IP)
- HTTP (80): 0.0.0.0/0
- HTTPS (443): 0.0.0.0/0 (선택사항)
- Custom TCP (5000): 0.0.0.0/0 (Flask 앱용)
```

## 🖥️ 2단계: EC2 인스턴스 접속 및 환경 설정

### SSH 접속:
```bash
ssh -i your-key.pem ubuntu@your-ec2-public-ip
```

### 시스템 업데이트:
```bash
sudo apt update && sudo apt upgrade -y
```

### Python 및 필수 패키지 설치:
```bash
sudo apt install python3 python3-pip python3-venv nginx -y
sudo apt install build-essential python3-dev -y
```

## 🐍 3단계: Python 환경 설정

### 프로젝트 디렉토리 생성:
```bash
mkdir -p /home/ubuntu/bitcoin-dashboard
cd /home/ubuntu/bitcoin-dashboard
```

### 가상환경 생성:
```bash
python3 -m venv venv
source venv/bin/activate
```

### Python 패키지 설치:
```bash
pip install --upgrade pip
pip install -r requirements.txt
```

## 📦 4단계: 프로젝트 파일 업로드

### 방법 1: Git 사용 (권장)
```bash
# EC2에서 Git 설치
sudo apt install git -y

# 프로젝트 클론
git clone https://github.com/your-username/bitcoin-dashboard.git .
```

### 방법 2: SCP 사용
```bash
# 로컬에서 실행
scp -i your-key.pem -r ./build ubuntu@your-ec2-public-ip:/home/ubuntu/bitcoin-dashboard/
scp -i your-key.pem app.py ubuntu@your-ec2-public-ip:/home/ubuntu/bitcoin-dashboard/
scp -i your-key.pem requirements.txt ubuntu@your-ec2-public-ip:/home/ubuntu/bitcoin-dashboard/
```

## 🔧 5단계: Flask 앱 설정 수정

### app.py 수정 (프로덕션 환경):
```python
if __name__ == '__main__':
    print('🚀 Flask 서버 시작 중...')
    print('💚 헬스 체크: http://0.0.0.0:5000/health')
    print('📰 뉴스 API: http://0.0.0.0:5000/api/news')
    # 프로덕션에서는 debug=False
    app.run(host='0.0.0.0', port=5000, debug=False)
```

## 🚀 6단계: Gunicorn으로 프로덕션 서버 실행

### Gunicorn 설치:
```bash
pip install gunicorn
```

### Gunicorn 설정 파일 생성:
```bash
# gunicorn.conf.py
cat > gunicorn.conf.py << EOF
bind = "0.0.0.0:5000"
workers = 4
worker_class = "sync"
worker_connections = 1000
timeout = 30
keepalive = 2
max_requests = 1000
max_requests_jitter = 100
preload_app = True
EOF
```

### Gunicorn 서비스 파일 생성:
```bash
sudo tee /etc/systemd/system/bitcoin-dashboard.service << EOF
[Unit]
Description=Bitcoin Prediction Dashboard
After=network.target

[Service]
User=ubuntu
WorkingDirectory=/home/ubuntu/bitcoin-dashboard
Environment="PATH=/home/ubuntu/bitcoin-dashboard/venv/bin"
ExecStart=/home/ubuntu/bitcoin-dashboard/venv/bin/gunicorn -c gunicorn.conf.py app:app
ExecReload=/bin/kill -s HUP \$MAINPID
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
EOF
```

## 🌐 7단계: Nginx 설정 (선택사항)

### Nginx 설정 파일 생성:
```bash
sudo tee /etc/nginx/sites-available/bitcoin-dashboard << EOF
server {
    listen 80;
    server_name your-domain.com;  # 또는 EC2 퍼블릭 IP

    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    location /static/ {
        alias /home/ubuntu/bitcoin-dashboard/build/static/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
EOF
```

### Nginx 활성화:
```bash
sudo ln -s /etc/nginx/sites-available/bitcoin-dashboard /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
sudo systemctl enable nginx
```

## 🚀 8단계: 서비스 시작

### Gunicorn 서비스 시작:
```bash
sudo systemctl daemon-reload
sudo systemctl start bitcoin-dashboard
sudo systemctl enable bitcoin-dashboard
sudo systemctl status bitcoin-dashboard
```

## 📊 9단계: 모니터링 및 로그

### 서비스 상태 확인:
```bash
sudo systemctl status bitcoin-dashboard
sudo journalctl -u bitcoin-dashboard -f
```

### 포트 확인:
```bash
sudo netstat -tlnp | grep :5000
```

## 🔍 10단계: 테스트

### 로컬에서 테스트:
```bash
curl http://your-ec2-public-ip:5000/health
curl http://your-ec2-public-ip:5000/api/news
```

### 브라우저에서 테스트:
- http://your-ec2-public-ip:5000 (직접 접속)
- http://your-ec2-public-ip (Nginx 프록시 사용시)

## 🛠️ 문제 해결

### 포트 충돌:
```bash
sudo lsof -i :5000
sudo kill -9 <PID>
```

### 권한 문제:
```bash
sudo chown -R ubuntu:ubuntu /home/ubuntu/bitcoin-dashboard
sudo chmod -R 755 /home/ubuntu/bitcoin-dashboard
```

### 방화벽 확인:
```bash
sudo ufw status
sudo ufw allow 5000
```

## 📈 확장 가능성

- **로드 밸런서**: ALB/ELB 사용
- **Auto Scaling**: EC2 Auto Scaling Group 설정
- **모니터링**: CloudWatch 설정
- **로깅**: CloudWatch Logs 설정

## 🔐 보안 고려사항

- **HTTPS**: SSL/TLS 인증서 설정
- **방화벽**: 필요한 포트만 열기
- **IAM**: 최소 권한 원칙 적용
- **백업**: 정기적인 백업 설정
