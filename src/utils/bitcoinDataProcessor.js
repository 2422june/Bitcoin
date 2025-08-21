// Bitcoin CSV 데이터 처리 및 UTC to KST 변환 유틸리티

// UTC to KST 변환 함수 (UTC + 9시간)
function convertUTCToKST(utcTimestamp) {
  const date = new Date(utcTimestamp * 1000); // Unix timestamp를 밀리초로 변환
  const kstDate = new Date(date.getTime() + (9 * 60 * 60 * 1000)); // UTC + 9시간
  return kstDate;
}

// CSV 데이터 파싱 및 변환
export function processBitcoinCSVData(csvData) {
  const lines = csvData.trim().split('\n');
  const headers = lines[0].split(',');
  const data = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    const row = {};
    
    headers.forEach((header, index) => {
      row[header.trim()] = values[index]?.trim();
    });

    // UTC timestamp를 KST로 변환
    const utcTimestamp = parseFloat(row.Timestamp);
    const kstDate = convertUTCToKST(utcTimestamp);
    
    // KST 시간 정보 추출
    const kstYear = kstDate.getFullYear();
    const kstMonth = String(kstDate.getMonth() + 1).padStart(2, '0');
    const kstDay = String(kstDate.getDate()).padStart(2, '0');
    const kstHour = String(kstDate.getHours()).padStart(2, '0');
    const kstMinute = String(kstDate.getMinutes()).padStart(2, '0');
    const kstSecond = String(kstDate.getSeconds()).padStart(2, '0');

    // 변환된 데이터 객체 생성
    const processedRow = {
      timestamp: utcTimestamp,
      kstDate: kstDate,
      kstDateString: `${kstYear}-${kstMonth}-${kstDay}`,
      kstTimeString: `${kstHour}:${kstMinute}:${kstSecond}`,
      kstDateTimeString: `${kstYear}-${kstMonth}-${kstDay} ${kstHour}:${kstMinute}:${kstSecond}`,
      open: parseFloat(row.Open),
      high: parseFloat(row.High),
      low: parseFloat(row.Low),
      close: parseFloat(row.Close),
      volume: parseFloat(row.Volume),
      // KRW로 변환 (USD * 1300)
      openKRW: Math.round(parseFloat(row.Open) * 1300),
      highKRW: Math.round(parseFloat(row.High) * 1300),
      lowKRW: Math.round(parseFloat(row.Low) * 1300),
      closeKRW: Math.round(parseFloat(row.Close) * 1300),
      // 변동률 계산
      changePercent: ((parseFloat(row.Close) - parseFloat(row.Open)) / parseFloat(row.Open)) * 100
    };

    data.push(processedRow);
  }

  return data;
}

// 분별 변동 데이터 생성
export function generateMinuteFluctuationData(processedData) {
  return processedData.map((row, index) => {
    const timeLabel = `${row.kstHour}:${row.kstMinute}`;
    return {
      time: timeLabel,
      value: Math.round(row.changePercent * 100) / 100, // 소수점 2자리
      timestamp: row.kstDate,
      price: row.closeKRW,
      volume: row.volume
    };
  });
}

// 시간별 가격 데이터 생성
export function generateHourlyPriceData(processedData) {
  const hourlyData = {};
  
  processedData.forEach(row => {
    const hourKey = `${row.kstHour}:00`;
    
    if (!hourlyData[hourKey]) {
      hourlyData[hourKey] = {
        hour: hourKey,
        prices: [],
        volumes: []
      };
    }
    
    hourlyData[hourKey].prices.push(row.closeKRW);
    hourlyData[hourKey].volumes.push(row.volume);
  });

  // 각 시간별 평균 가격 계산
  return Object.values(hourlyData).map(hourData => ({
    hour: hourData.hour,
    price: Math.round(hourData.prices.reduce((sum, price) => sum + price, 0) / hourData.prices.length),
    volume: hourData.volumes.reduce((sum, volume) => sum + volume, 0),
    timestamp: new Date()
  }));
}

// 일별 가격 데이터 생성
export function generateDailyPriceData(processedData) {
  const dailyData = {};
  
  processedData.forEach(row => {
    const dayKey = row.kstDateString;
    
    if (!dailyData[dayKey]) {
      dailyData[dayKey] = {
        day: dayKey,
        prices: [],
        volumes: []
      };
    }
    
    dailyData[dayKey].prices.push(row.closeKRW);
    dailyData[dayKey].volumes.push(row.volume);
  });

  // 각 일별 데이터 계산
  return Object.values(dailyData).map(dayData => {
    const prices = dayData.prices;
    const startPrice = prices[0];
    const endPrice = prices[prices.length - 1];
    const middlePrice = Math.round((startPrice + endPrice) / 2);
    
    return {
      day: dayData.day,
      startPrice: startPrice,
      middlePrice: middlePrice,
      endPrice: endPrice,
      volume: dayData.volumes.reduce((sum, volume) => sum + volume, 0),
      timestamp: new Date(dayData.day)
    };
  });
}

// 예측 히스토리 데이터 생성
export function generatePredictionHistory(processedData) {
  const history = [];
  
  for (let i = 1; i < processedData.length; i++) {
    const prevRow = processedData[i - 1];
    const currentRow = processedData[i];
    
    const actualChange = ((currentRow.close - prevRow.close) / prevRow.close) * 100;
    
    // 예측값은 실제값에 약간의 오차를 추가 (더 현실적인 시뮬레이션)
    const predictionError = (Math.random() - 0.5) * 4; // -2% ~ +2% 오차
    const predictedChange = actualChange + predictionError;
    
    history.push({
      date: currentRow.kstDateString,
      predictedChange: Math.round(predictedChange * 100) / 100,
      actualChange: Math.round(actualChange * 100) / 100,
      difference: Math.round(Math.abs(predictedChange - actualChange) * 100) / 100,
      predictedPrice: Math.round(prevRow.closeKRW * (1 + predictedChange / 100)),
      actualPrice: currentRow.closeKRW
    });
  }
  
  return history;
}

// 전체 데이터 처리 및 변환 함수
export function processAndConvertBitcoinData(csvData) {
  const processedData = processBitcoinCSVData(csvData);
  
  return {
    rawData: processedData,
    minuteFluctuationData: generateMinuteFluctuationData(processedData),
    hourlyPriceData: generateHourlyPriceData(processedData),
    dailyPriceData: generateDailyPriceData(processedData),
    predictionHistory: generatePredictionHistory(processedData),
    // 최신 가격 정보
    latestPrice: processedData[processedData.length - 1]?.closeKRW || 165372669.46,
    latestChangePercent: processedData[processedData.length - 1]?.changePercent || 0
  };
}
