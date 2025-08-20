import { useSyncExternalStore } from 'react';

const listeners = new Set();

const state = {
  prevPrediction: 0, // 직전 예측 변동률(%)
  actualChange: 0,   // 실제 변동률(%)
  difference: 0,     // |prevPrediction - actualChange|
  prevPredictedPrice: 0, // 이전 예상 가격 (KRW)
  actualPrice: 0,    // 실제 가격 (KRW)
  minuteFluctuationData: [], // 분별 변동 데이터
  hourlyPriceData: [], // 시간별 가격 데이터
  dailyPriceData: [], // 일별 가격 데이터
  lastUpdatedAt: null,
};

function emitChange() {
  listeners.forEach((l) => l());
}

export function getPredictionState() {
  return state;
}

export function setPrevPrediction(value) {
  state.prevPrediction = Number(value) || 0;
  state.lastUpdatedAt = new Date();
  state.difference = Math.abs(state.prevPrediction - state.actualChange);
  emitChange();
}

export function setActualChange(value) {
  state.actualChange = Number(value) || 0;
  state.lastUpdatedAt = new Date();
  state.difference = Math.abs(state.prevPrediction - state.actualChange);
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

export function usePredictionStore(selector = (s) => s) {
  const subscribe = (cb) => {
    listeners.add(cb);
    return () => listeners.delete(cb);
  };
  const getSnapshot = () => state;
  const snapshot = useSyncExternalStore(subscribe, getSnapshot);
  return selector(snapshot);
}