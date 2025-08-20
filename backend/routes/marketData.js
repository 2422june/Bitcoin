
const express = require('express');
const router = express.Router();
const axios = require('axios');

// CryptoCompare 시장 데이터 API 설정
const MARKET_API_CONFIG = {
  BASE_URL: 'https://min-api.cryptocompare.com',
  API_KEY: 'abcd1ee5e61ab2b61e200bc5ecb4f90205ddbab79c1580e94e62ce6ed06fef13',
  ENDPOINTS: {
    PRICE: '/data/price',
    HISTO: '/data/v2/histominute',
    HISTOHOUR: '/data/v2/histohour',
    HISTODAY: '/data/v2/histoday',
    TOP_PAIRS: '/data/top/pairs',
    SOCIAL: '/data/social/coin/latest'
  }
};

// 더미 시장 데이터 생성
const generateMarketData = () => {
  const now = new Date();
  const basePrice = 45000 + Math.random() * 5000;
  
  // 24시간 변동 데이터
  const hourlyData = [];
  for (let i = 23; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000);
    const fluctuation = (Math.random() - 0.5) * 0.1; // ±5%
    const price = basePrice * (1 + fluctuation);
    
    hourlyData.push({
      timestamp: timestamp.toISOString(),
      price: Math.round(price * 100) / 100,
      volume: Math.floor(Math.random() * 1000000) + 100000,
      marketCap: Math.floor(Math.random() * 1000000000) + 800000000000
    });
  }
  
  return {
    current: {
      price: Math.round(basePrice * 100) / 100,
      change24h: Math.round((Math.random() - 0.5) * 10 * 100) / 100,
      changePercent24h: Math.round((Math.random() - 0.5) * 8 * 100) / 100,
      volume24h: Math.floor(Math.random() * 50000000) + 20000000,
      marketCap: Math.floor(Math.random() * 200000000000) + 800000000000,
      circulatingSupply: Math.floor(Math.random() * 20000000) + 19500000,
      maxSupply: 21000000
    },
    hourly: hourlyData
  };
};

// 더미 일별 데이터 생성
const generateDailyData = (days = 30) => {
  const dailyData = [];
  const now = new Date();
  const basePrice = 40000;
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const fluctuation = (Math.random() - 0.5) * 0.2; // ±10%
    const price = basePrice * (1 + fluctuation);
    
    dailyData.push({
      date: date.toISOString().split('T')[0],
      open: Math.round(price * 100) / 100,
      high: Math.round(price * (1 + Math.random() * 0.05) * 100) / 100,
      low: Math.round(price * (1 - Math.random() * 0.05) * 100) / 100,
      close: Math.round(price * (1 + (Math.random() - 0.5) * 0.02) * 100) / 100,
      volume: Math.floor(Math.random() * 100000000) + 50000000,
      marketCap: Math.floor(Math.random() * 200000000000) + 800000000000
    });
  }
  
  return dailyData;
};

// GET /api/market/current - 현재 시장 데이터
router.get('/current', async (req, res) => {
  try {
    const { fsym = 'BTC', tsym = 'USD' } = req.query;
    
    console.log('📊 시장 데이터 API 호출:', { fsym, tsym });
    
    // CryptoCompare API 호출 시도
    try {
      const response = await axios.get(
        `${MARKET_API_CONFIG.BASE_URL}${MARKET_API_CONFIG.ENDPOINTS.PRICE}`,
        {
          params: {
            fsym,
            tsyms: tsym,
            api_key: MARKET_API_CONFIG.API_KEY
          },
          timeout: 10000
        }
      );
      
      if (response.data && response.data[tsym]) {
        console.log('✅ 실제 시장 데이터 반환');
        const currentPrice = response.data[tsym];
        
        res.json({
          success: true,
          data: {
            symbol: fsym,
            price: currentPrice,
            currency: tsym,
            timestamp: new Date().toISOString(),
            source: 'CryptoCompare API'
          },
          timestamp: new Date().toISOString()
        });
      } else {
        throw new Error('유효하지 않은 응답 데이터');
      }
    } catch (apiError) {
      console.log('⚠️ API 호출 실패, 더미 데이터 반환:', apiError.message);
      
      // API 실패시 더미 데이터 반환
      const dummyData = generateMarketData();
      res.json({
        success: true,
        data: {
          ...dummyData.current,
          symbol: fsym,
          currency: tsym,
          source: 'Dummy Data (API Fallback)'
        },
        timestamp: new Date().toISOString()
      });
    }
    
  } catch (error) {
    console.error('시장 데이터 조회 오류:', error.message);
    res.status(500).json({
      success: false,
      error: '시장 데이터를 가져오는데 실패했습니다.',
      timestamp: new Date().toISOString()
    });
  }
});

// GET /api/market/hourly - 시간별 데이터
router.get('/hourly', async (req, res) => {
  try {
    const { fsym = 'BTC', tsym = 'USD', limit = 24 } = req.query;
    
    console.log('⏰ 시간별 데이터 API 호출:', { fsym, tsym, limit });
    
    // CryptoCompare API 호출 시도
    try {
      const response = await axios.get(
        `${MARKET_API_CONFIG.BASE_URL}${MARKET_API_CONFIG.ENDPOINTS.HISTOHOUR}`,
        {
          params: {
            fsym,
            tsym,
            limit: parseInt(limit),
            api_key: MARKET_API_CONFIG.API_KEY
          },
          timeout: 10000
        }
      );
      
      if (response.data && response.data.Data && response.data.Data.Data) {
        console.log('✅ 실제 시간별 데이터 반환');
        const hourlyData = response.data.Data.Data.map(item => ({
          timestamp: new Date(item.time * 1000).toISOString(),
          open: item.open,
          high: item.high,
          low: item.low,
          close: item.close,
          volume: item.volumefrom,
          marketCap: item.volumeto
        }));
        
        res.json({
          success: true,
          data: hourlyData,
          count: hourlyData.length,
          source: 'CryptoCompare API',
          timestamp: new Date().toISOString()
        });
      } else {
        throw new Error('유효하지 않은 응답 데이터');
      }
    } catch (apiError) {
      console.log('⚠️ API 호출 실패, 더미 데이터 반환:', apiError.message);
      
      // API 실패시 더미 데이터 반환
      const dummyData = generateMarketData();
      res.json({
        success: true,
        data: dummyData.hourly.slice(0, parseInt(limit)),
        count: Math.min(parseInt(limit), dummyData.hourly.length),
        source: 'Dummy Data (API Fallback)',
        timestamp: new Date().toISOString()
      });
    }
    
  } catch (error) {
    console.error('시간별 데이터 조회 오류:', error.message);
    res.status(500).json({
      success: false,
      error: '시간별 데이터를 가져오는데 실패했습니다.',
      timestamp: new Date().toISOString()
    });
  }
});

// GET /api/market/daily - 일별 데이터
router.get('/daily', async (req, res) => {
  try {
    const { fsym = 'BTC', tsym = 'USD', days = 30 } = req.query;
    
    console.log('📅 일별 데이터 API 호출:', { fsym, tsym, days });
    
    // CryptoCompare API 호출 시도
    try {
      const response = await axios.get(
        `${MARKET_API_CONFIG.BASE_URL}${MARKET_API_CONFIG.ENDPOINTS.HISTODAY}`,
        {
          params: {
            fsym,
            tsym,
            limit: parseInt(days),
            api_key: MARKET_API_CONFIG.API_KEY
          },
          timeout: 10000
        }
      );
      
      if (response.data && response.data.Data && response.data.Data.Data) {
        console.log('✅ 실제 일별 데이터 반환');
        const dailyData = response.data.Data.Data.map(item => ({
          date: new Date(item.time * 1000).toISOString().split('T')[0],
          open: item.open,
          high: item.high,
          low: item.low,
          close: item.close,
          volume: item.volumefrom,
          marketCap: item.volumeto
        }));
        
        res.json({
          success: true,
          data: dailyData,
          count: dailyData.length,
          source: 'CryptoCompare API',
          timestamp: new Date().toISOString()
        });
      } else {
        throw new Error('유효하지 않은 응답 데이터');
      }
    } catch (apiError) {
      console.log('⚠️ API 호출 실패, 더미 데이터 반환:', apiError.message);
      
      // API 실패시 더미 데이터 반환
      const dummyData = generateDailyData(parseInt(days));
      res.json({
        success: true,
        data: dummyData,
        count: dummyData.length,
        source: 'Dummy Data (API Fallback)',
        timestamp: new Date().toISOString()
      });
    }
    
  } catch (error) {
    console.error('일별 데이터 조회 오류:', error.message);
    res.status(500).json({
      success: false,
      error: '일별 데이터를 가져오는데 실패했습니다.',
      timestamp: new Date().toISOString()
    });
  }
});

// GET /api/market/summary - 시장 요약 정보
router.get('/summary', (req, res) => {
  try {
    const summary = {
      totalMarketCap: Math.floor(Math.random() * 2000000000000) + 1000000000000,
      totalVolume24h: Math.floor(Math.random() * 100000000000) + 50000000000,
      btcDominance: Math.round((40 + Math.random() * 20) * 100) / 100,
      activeCoins: Math.floor(Math.random() * 1000) + 2000,
      marketChange24h: Math.round((Math.random() - 0.5) * 10 * 100) / 100,
      fearGreedIndex: Math.floor(Math.random() * 100),
      timestamp: new Date().toISOString()
    };
    
    res.json({
      success: true,
      data: summary,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('시장 요약 조회 오류:', error.message);
    res.status(500).json({
      success: false,
      error: '시장 요약을 가져오는데 실패했습니다.',
      timestamp: new Date().toISOString()
    });
  }
});

module.exports = router;

