import { useSyncExternalStore } from 'react';

const listeners = new Set();

const state = {
  prevPrediction: 0, // 직전 예측 변동률(%)
  actualChange: 0,   // 실제 변동률(%)
  difference: 0,     // |prevPrediction - actualChange|
  prevPredictedPrice: 0, // 이전 예상 가격 (KRW)
  actualPrice: 0,    // 실제 가격 (KRW)
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

export function usePredictionStore(selector = (s) => s) {
  const subscribe = (cb) => {
    listeners.add(cb);
    return () => listeners.delete(cb);
  };
  const getSnapshot = () => state;
  const snapshot = useSyncExternalStore(subscribe, getSnapshot);
  return selector(snapshot);
}


