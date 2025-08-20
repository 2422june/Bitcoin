// 예측 관련 액션들
export const PREDICTION_ACTIONS = {
  CREATE_PREDICTION: 'CREATE_PREDICTION',
  UPDATE_PREDICTION: 'UPDATE_PREDICTION',
  DELETE_PREDICTION: 'DELETE_PREDICTION',
  FETCH_PREDICTIONS: 'FETCH_PREDICTIONS'
};

// 예측 생성 액션
export const createPrediction = (prediction) => ({
  type: PREDICTION_ACTIONS.CREATE_PREDICTION,
  payload: prediction
});

// 예측 업데이트 액션
export const updatePrediction = (id, updates) => ({
  type: PREDICTION_ACTIONS.UPDATE_PREDICTION,
  payload: { id, updates }
});

// 예측 삭제 액션
export const deletePrediction = (id) => ({
  type: PREDICTION_ACTIONS.DELETE_PREDICTION,
  payload: id
});

// 예측 목록 가져오기 액션
export const fetchPredictions = (predictions) => ({
  type: PREDICTION_ACTIONS.FETCH_PREDICTIONS,
  payload: predictions
});
