from flask import Flask, render_template, request, jsonify, send_from_directory
from flask_cors import CORS
import requests
import os
from datetime import datetime
import json

app = Flask(__name__, static_folder='build', static_url_path='')

# CORS 설정 - 모든 도메인에서 접근 허용
CORS(app, resources={
    r"/*": {
        "origins": "*",
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization", "Accept", "Origin", "X-Requested-With"],
        "supports_credentials": False
    }
})

# React 빌드 파일 경로
REACT_BUILD_DIR = 'build'

# CoinDesk RSS 피드 설정
COINDESK_RSS_CONFIG = {
    'BASE_URL': 'https://www.coindesk.com',
    'RSS_FEEDS': [
        '/arc/outboundfeeds/rss/',
        '/arc/outboundfeeds/rss/?outputType=xml',
        '/feed/',
        '/rss/'
    ]
}

def parse_rss_feed(rss_url):
    """RSS 피드에서 뉴스 데이터 추출"""
    try:
        print(f'📡 RSS 피드 호출: {rss_url}')
        
        response = requests.get(rss_url, timeout=15, headers={
            'User-Agent': 'Bitcoin-Prediction-Flask/1.0',
            'Accept': 'application/xml, text/xml'
        })
        
        xml_data = response.text
        print(f'📊 RSS 데이터 수신: {len(xml_data)} bytes')
        
        # 간단한 XML 파싱 (정규식 사용) - CDATA 지원
        import re
        articles = []
        item_regex = re.compile(r'<item>([\s\S]*?)</item>')
        title_regex = re.compile(r'<title>(?:<!\[CDATA\[(.*?)\]\]>|(.*?))</title>')
        link_regex = re.compile(r'<link>(.*?)</link>')
        description_regex = re.compile(r'<description>(?:<!\[CDATA\[(.*?)\]\]>|(.*?))</description>')
        pub_date_regex = re.compile(r'<pubDate>(.*?)</pubDate>')
        
        for match in item_regex.findall(xml_data):
            if len(articles) >= 12:
                break
                
            item_content = match
            
            # 정규식 매칭 결과에서 CDATA 또는 일반 텍스트 추출
            title_match = title_regex.search(item_content)
            link_match = link_regex.search(item_content)
            description_match = description_regex.search(item_content)
            pub_date_match = pub_date_regex.search(item_content)
            
            title = '제목 없음'
            link = '#'
            description = ''
            pub_date = datetime.now().isoformat()
            
            # title 처리 (CDATA 또는 일반 텍스트)
            if title_match:
                title = (title_match.group(1) or title_match.group(2) or '제목 없음').strip()
            
            # link 처리
            if link_match:
                link = (link_match.group(1) or '#').strip()
            
            # description 처리 (CDATA 또는 일반 텍스트)
            if description_match:
                description = (description_match.group(1) or description_match.group(2) or '').strip()
            
            # pubDate 처리
            if pub_date_match:
                pub_date = (pub_date_match.group(1) or datetime.now().isoformat()).strip()
            
            # HTML 엔티티 정리
            title = title.replace('&amp;', '&').replace('&lt;', '<').replace('&gt;', '>').replace('&quot;', '"').replace('&#39;', "'").strip()
            description = description.replace('&amp;', '&').replace('&lt;', '<').replace('&gt;', '>').replace('&quot;', '"').replace('&#39;', "'").strip()
            
            # description이 비어있거나 너무 짧으면 title을 사용
            if not description or len(description.strip()) < 10:
                description = title
            
            # 비트코인/암호화폐 관련 뉴스 필터링
            title_lower = title.lower()
            desc_lower = description.lower()
            
            if any(keyword in title_lower or keyword in desc_lower 
                   for keyword in ['bitcoin', 'crypto', 'blockchain', 'ethereum', 'defi', 'nft']):
                
                articles.append({
                    'id': f'rss-{len(articles) + 1}',
                    'title': title,
                    'description': description,
                    'url': link,
                    'publishedAt': pub_date,
                    'source': {'name': 'CoinDesk'},
                    'author': 'CoinDesk',
                    'imageUrl': None
                })
        
        print(f'✅ RSS에서 {len(articles)}개의 비트코인 뉴스 추출')
        return articles
        
    except Exception as error:
        print(f'❌ RSS 피드 파싱 오류: {error}')
        return []

@app.route('/')
def index():
    """React 앱 메인 페이지"""
    return app.send_static_file('index.html')

@app.route('/api/news')
def get_news():
    """뉴스 API 엔드포인트"""
    try:
        limit = request.args.get('limit', 12, type=int)
        print(f'📰 뉴스 API 호출: limit={limit}')
        
        # CoinDesk RSS 피드에서 뉴스 가져오기 (여러 피드 시도)
        articles = []
        last_error = None
        
        for i, feed_path in enumerate(COINDESK_RSS_CONFIG['RSS_FEEDS']):
            rss_url = f"{COINDESK_RSS_CONFIG['BASE_URL']}{feed_path}"
            print(f'🔗 CoinDesk RSS URL {i + 1} 시도: {rss_url}')
            
            try:
                articles = parse_rss_feed(rss_url)
                if articles and len(articles) > 0:
                    print(f'✅ RSS 피드 {i + 1}에서 {len(articles)}개의 뉴스 추출 성공')
                    break
            except Exception as rss_error:
                print(f'⚠️ RSS 피드 {i + 1} 실패: {rss_error}')
                last_error = rss_error
                continue
        
        if articles and len(articles) > 0:
            print(f'✅ RSS에서 실제 뉴스 데이터 반환: {len(articles)}개')
            return jsonify({
                'success': True,
                'data': articles,
                'timestamp': datetime.now().isoformat()
            })
        else:
            print('⚠️ 모든 RSS 피드에서 뉴스 데이터 없음')
            return jsonify({
                'success': False,
                'data': [],
                'error': f'모든 RSS 피드 호출 실패: {last_error}',
                'timestamp': datetime.now().isoformat()
            }), 500
            
    except Exception as error:
        print(f'❌ 뉴스 API 오류: {error}')
        return jsonify({
            'success': False,
            'data': [],
            'error': str(error),
            'timestamp': datetime.now().isoformat()
        }), 500

@app.route('/api/market-data')
def get_market_data():
    """시장 데이터 API 엔드포인트 (더미 데이터)"""
    return jsonify({
        'success': True,
        'data': {
            'currentPrice': 45000,
            'change24h': 2.5,
            'volume24h': 25000000000,
            'marketCap': 850000000000
        },
        'timestamp': datetime.now().isoformat()
    })

@app.route('/health')
def health_check():
    """헬스 체크 엔드포인트"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'service': 'Bitcoin Prediction Flask Backend'
    })

# React 빌드 파일 서빙 (SPA 라우팅 지원)
@app.route('/<path:path>')
def serve_react(path):
    """React 라우트 처리 - SPA 라우팅 지원"""
    # 정적 파일이 존재하면 서빙
    if os.path.exists(os.path.join(REACT_BUILD_DIR, path)):
        return send_from_directory(REACT_BUILD_DIR, path)
    # 그렇지 않으면 index.html 반환 (React Router 지원)
    else:
        return app.send_static_file('index.html')

if __name__ == '__main__':
    print('🚀 Flask 서버 시작 중...')
    print('💚 헬스 체크: http://localhost:5000/health')
    print('📰 뉴스 API: http://localhost:5000/api/news')
    app.run(host='0.0.0.0', port=5000, debug=True)
