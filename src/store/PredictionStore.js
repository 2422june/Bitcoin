import { useSyncExternalStore } from 'react';

const listeners = new Set();

const state = {
  prevPrediction: 0, // 직전 예측 변동률(%)
  actualChange: 0,   // 실제 변동률(%)
  difference: 0,     // |prevPrediction - actualChange|
  prevPredictedPrice: 0, // 이전 예상 가격 (KRW)
  actualPrice: 165372669.46,    // 실제 가격 (KRW) - 초기값 설정
  actualMinuteFluctuation: 0, // 분당 실제 변동치 (-100 ~ 100)
  minuteFluctuationData: [], // 분별 변동 데이터
  hourlyPriceData: [], // 시간별 가격 데이터
  dailyPriceData: [], // 일별 가격 데이터
  todayActualChanges: [], // 당일 실제 변동치 리스트
  currentHourChanges: [], // 이번 시 실제 변동치 리스트
  predictionHistory: [], // 예측 히스토리 데이터
  lastUpdatedAt: null,
  lastResetDate: null, // 마지막 초기화 날짜
  lastResetHour: null, // 마지막 시간 초기화
};

// 실제 비트코인 데이터 초기화
const initializeRealBitcoinData = () => {
  const realData = [
    { date: '2022-01-15', open: 43101.898438, high: 43724.671875, low: 42669.035156, close: 43177.398438, volume: 18371348298 },
    { date: '2022-01-16', open: 43172.039063, high: 43436.808594, low: 42691.023438, close: 43113.878906, volume: 17902097845 },
    { date: '2022-01-17', open: 43118.121094, high: 43179.390625, low: 41680.320313, close: 42250.550781, volume: 21690904261 },
    { date: '2022-01-18', open: 42250.074219, high: 42534.402344, low: 41392.214844, close: 42375.632813, volume: 22417209227 },
    { date: '2022-01-19', open: 42374.039063, high: 42478.304688, low: 41242.914063, close: 41744.328125, volume: 23091543258 },
    { date: '2022-01-20', open: 41736.527344, high: 42034.734375, low: 41724.464844, close: 41933.546875, volume: 23457787904 }
  ];

  // 실제 데이터를 데일리 데이터로 변환 (KRW로 변환: USD * 1300)
  state.dailyPriceData = realData.map(item => ({
    day: item.date,
    startPrice: Math.round(item.open * 1300),
    middlePrice: Math.round(((item.high + item.low) / 2) * 1300),
    endPrice: Math.round(item.close * 1300),
    timestamp: new Date(item.date)
  }));

  // 빈 데이터 추가 (오른쪽에 1개)
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  state.dailyPriceData.push({
    day: todayStr,
    startPrice: 0,
    middlePrice: 0,
    endPrice: 0,
    timestamp: today
  });

  console.log('📊 실제 비트코인 데이터 초기화 완료:', state.dailyPriceData);
};

  // 초기화 실행
  initializeRealBitcoinData();

// 예측 히스토리 데이터 초기화
const initializePredictionHistory = () => {
  // 실제 데이터 기반으로 예측 히스토리 생성
  const realData = [
    { date: '2022-01-15', close: 43177.398438 },
    { date: '2022-01-16', close: 43113.878906 },
    { date: '2022-01-17', close: 42250.550781 },
    { date: '2022-01-18', close: 42375.632813 },
    { date: '2022-01-19', close: 41744.328125 },
    { date: '2022-01-20', close: 41933.546875 }
  ];

  // 예측 히스토리 데이터 생성 (실제 변동률 기반)
  const predictionHistory = realData.map((item, index) => {
    if (index === 0) return null; // 첫 번째 데이터는 이전 예측이 없음
    
    const prevClose = realData[index - 1].close;
    const currentClose = item.close;
    const actualChange = ((currentClose - prevClose) / prevClose) * 100;
    
    // 예측값은 실제값에 약간의 오차를 추가
    const predictionError = (Math.random() - 0.5) * 2; // -1% ~ +1% 오차
    const predictedChange = actualChange + predictionError;
    
    return {
      date: item.date,
      predictedChange: Math.round(predictedChange * 100) / 100,
      actualChange: Math.round(actualChange * 100) / 100,
      difference: Math.round(Math.abs(predictedChange - actualChange) * 100) / 100,
      predictedPrice: Math.round(prevClose * (1 + predictedChange / 100) * 1300),
      actualPrice: Math.round(currentClose * 1300)
    };
  }).filter(item => item !== null);

  // 예측 히스토리를 state에 저장
  state.predictionHistory = predictionHistory;
  
  console.log('📈 예측 히스토리 초기화 완료:', predictionHistory);
};

// 예측 히스토리 초기화 실행
initializePredictionHistory();

function emitChange() {
  listeners.forEach((l) => l());
}

export function getPredictionState() {
  return state;
}

// 매일 초기화 체크 및 실행 함수
function checkAndResetDaily() {
  const today = new Date().toDateString();
  
  // 마지막 초기화 날짜가 없거나 오늘과 다르면 초기화
  if (!state.lastResetDate || state.lastResetDate !== today) {
    state.todayActualChanges = [];
    state.lastResetDate = today;
    console.log('📅 당일 실제 변동치 리스트 초기화 완료');
  }
}

// 매시간 초기화 체크 및 실행 함수
function checkAndResetHourly() {
  const currentHour = new Date().getHours();
  
  // 마지막 초기화 시간이 없거나 현재 시간과 다르면 초기화
  if (state.lastResetHour === null || state.lastResetHour !== currentHour) {
    state.currentHourChanges = [];
    state.lastResetHour = currentHour;
    console.log(`🕐 ${currentHour}시 실제 변동치 리스트 초기화 완료`);
  }
}

export function setPrevPrediction(value) {
  state.prevPrediction = Number(value) || 0;
  state.lastUpdatedAt = new Date();
  state.difference = Math.round(Math.abs(state.prevPrediction - state.actualChange) * 100) / 100;
  emitChange();
}

export function setActualChange(value) {
  state.actualChange = Number(value) || 0;
  state.lastUpdatedAt = new Date();
  state.difference = Math.round(Math.abs(state.prevPrediction - state.actualChange) * 100) / 100;
  emitChange();
}

export function setPrevPredictedPrice(value) {
  state.prevPredictedPrice = Number(value) || 0;
  state.lastUpdatedAt = new Date();
  emitChange();
}

export function setActualPrice(value) {
  state.actualPrice = Number(value) || 0;
  state.lastUpdatedAt = new Date();
  emitChange();
}

export function setActualMinuteFluctuation(value) {
  // -10 ~ 10 사이의 값으로 제한
  const clampedValue = Math.max(-10, Math.min(10, Number(value) || 0));
  state.actualMinuteFluctuation = clampedValue;
  
  // 실제 가격에 변동치 반영
  const changeAmount = state.actualPrice * (clampedValue / 100);
  state.actualPrice = state.actualPrice + changeAmount;
  
  // 0원 이하인 경우 초기값으로 리셋
  if (state.actualPrice <= 0) {
    state.actualPrice = 165372669.46;
  }
  
  state.lastUpdatedAt = new Date();
  emitChange();
}

export function getActualMinuteFluctuation() {
  return state.actualMinuteFluctuation;
}

// 당일 실제 변동치 추가 함수
export function addTodayActualChange(change) {
  checkAndResetDaily(); // 매일 초기화 체크
  
  const changeData = {
    value: change,
    timestamp: new Date(),
    time: new Date().toLocaleTimeString('ko-KR', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    })
  };
  
  state.todayActualChanges.push(changeData);
  state.lastUpdatedAt = new Date();
  emitChange();
  
  console.log('📊 당일 실제 변동치 추가:', changeData);
}

// 당일 실제 변동치 리스트 가져오기
export function getTodayActualChanges() {
  checkAndResetDaily(); // 매일 초기화 체크
  return state.todayActualChanges;
}

// 당일 실제 변동치 평균 계산
export function getTodayAverageChange() {
  checkAndResetDaily(); // 매일 초기화 체크
  
  if (state.todayActualChanges.length === 0) {
    return 0;
  }
  
  const sum = state.todayActualChanges.reduce((acc, change) => acc + change.value, 0);
  const average = sum / state.todayActualChanges.length;
  return Math.round(average * 100) / 100; // 소수점 2자리
}

// 이번 시 실제 변동치 추가 함수
export function addCurrentHourChange(change) {
  checkAndResetHourly(); // 매시간 초기화 체크
  
  const changeData = {
    value: change,
    timestamp: new Date(),
    time: new Date().toLocaleTimeString('ko-KR', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    })
  };
  
  state.currentHourChanges.push(changeData);
  state.lastUpdatedAt = new Date();
  emitChange();
  
  console.log('🕐 이번 시 실제 변동치 추가:', changeData);
}

// 이번 시 실제 변동치 리스트 가져오기
export function getCurrentHourChanges() {
  checkAndResetHourly(); // 매시간 초기화 체크
  return state.currentHourChanges;
}

// 이번 시 실제 변동치 평균 계산
export function getCurrentHourAverageChange() {
  checkAndResetHourly(); // 매시간 초기화 체크
  
  if (state.currentHourChanges.length === 0) {
    return 0;
  }
  
  const sum = state.currentHourChanges.reduce((acc, change) => acc + change.value, 0);
  const average = sum / state.currentHourChanges.length;
  return Math.round(average * 100) / 100; // 소수점 2자리
}

// 60초마다 모든 값을 한 번에 업데이트하는 중앙 집중식 함수
export function updateAllValuesEveryMinute() {
  // 1. 새로운 예측 변동률 생성 (-10 ~ 10, 소수점 2자리)
  const newPrediction = Math.round((Math.random() * 20 - 10) * 100) / 100;
  
  // 2. 새로운 실제 변동률 생성 (-10 ~ 10, 소수점 2자리)
  const newActualChange = Math.round((Math.random() * 20 - 10) * 100) / 100;
  
  // 3. 실제 분당 변동치 업데이트 (실제 가격에 반영됨)
  const clampedActualChange = Math.max(-10, Math.min(10, newActualChange));
  state.actualMinuteFluctuation = clampedActualChange;
  
  // 4. 실제 가격 업데이트 (변동치 반영)
  const changeAmount = state.actualPrice * (clampedActualChange / 100);
  state.actualPrice = state.actualPrice + changeAmount;
  
  // 5. 0원 이하인 경우 초기값으로 리셋
  if (state.actualPrice <= 0) {
    state.actualPrice = 165372669.46;
  }
  
  // 6. 이전 예측값을 현재 예측값으로 업데이트
  state.prevPrediction = newPrediction;
  
  // 7. 실제 변동률 업데이트
  state.actualChange = newActualChange;
  
  // 7-1. 당일 실제 변동치 리스트에 추가
  addTodayActualChange(newActualChange);
  
  // 7-2. 이번 시 실제 변동치 리스트에 추가
  addCurrentHourChange(newActualChange);
  
  // 8. 차이값 계산 (소수점 2자리)
  state.difference = Math.round(Math.abs(state.prevPrediction - state.actualChange) * 100) / 100;
  
  // 9. 예상 가격 계산 및 업데이트
  const predictedChangeAmount = state.actualPrice * (newPrediction / 100);
  state.prevPredictedPrice = state.actualPrice + predictedChangeAmount;
  
  // 10. 마지막 업데이트 시간 기록
  state.lastUpdatedAt = new Date();
  
  // 11. 변경사항 알림
  emitChange();
  
  // 12. 반환값 (다른 컴포넌트에서 사용할 수 있도록)
  return {
    newPrediction,
    newActualChange,
    newActualPrice: state.actualPrice,
    newPredictedPrice: state.prevPredictedPrice
  };
}

export function addMinuteFluctuationData(minute, fluctuation) {
  // 새로운 분별 데이터 추가
  const newData = {
    time: minute,
    value: fluctuation,
    timestamp: new Date()
  };
  
  // 기존 데이터에 추가
  state.minuteFluctuationData.push(newData);
  
  // 60개 데이터만 유지 (60분)
  if (state.minuteFluctuationData.length > 60) {
    state.minuteFluctuationData = state.minuteFluctuationData.slice(-60);
  }
  
  state.lastUpdatedAt = new Date();
  emitChange();
}

export function getMinuteFluctuationData() {
  return state.minuteFluctuationData;
}

export function addHourlyPriceData(hour, price) {
  // 새로운 시간별 가격 데이터 추가
  const newData = {
    hour: `${hour}:00`,
    price: price,
    timestamp: new Date()
  };
  
  // 기존 데이터에서 같은 시간이 있으면 업데이트, 없으면 추가
  const existingIndex = state.hourlyPriceData.findIndex(data => data.hour === newData.hour);
  if (existingIndex >= 0) {
    state.hourlyPriceData[existingIndex] = newData;
  } else {
    state.hourlyPriceData.push(newData);
  }
  
  // 24개 데이터만 유지 (24시간)
  if (state.hourlyPriceData.length > 24) {
    state.hourlyPriceData = state.hourlyPriceData.slice(-24);
  }
  
  state.lastUpdatedAt = new Date();
  emitChange();
}

export function addDailyPriceData(date, startPrice, middlePrice, endPrice) {
  // 새로운 일별 가격 데이터 추가
  const newData = {
    day: date,
    startPrice: startPrice,
    middlePrice: middlePrice,
    endPrice: endPrice,
    timestamp: new Date()
  };
  
  // 기존 데이터에서 같은 날짜가 있으면 업데이트, 없으면 추가
  const existingIndex = state.dailyPriceData.findIndex(data => data.day === newData.day);
  if (existingIndex >= 0) {
    state.dailyPriceData[existingIndex] = newData;
  } else {
    state.dailyPriceData.push(newData);
  }
  
  // 7개 데이터만 유지 (7일)
  if (state.dailyPriceData.length > 7) {
    state.dailyPriceData = state.dailyPriceData.slice(-7);
  }
  
  state.lastUpdatedAt = new Date();
  emitChange();
}

export function getHourlyPriceData() {
  return state.hourlyPriceData;
}

export function getDailyPriceData() {
  return state.dailyPriceData;
}

export function getPredictionHistory() {
  return state.predictionHistory;
}

export function usePredictionStore(selector = (s) => s) {
  const subscribe = (cb) => {
    listeners.add(cb);
    return () => listeners.delete(cb);
  };
  const getSnapshot = () => state;
  const snapshot = useSyncExternalStore(subscribe, getSnapshot);
  return selector(snapshot);
}