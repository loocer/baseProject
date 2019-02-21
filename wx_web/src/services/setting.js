import request, { getParamString, HEADER_JSON } from '../utils/request';

export function getQuestions(Authorization) {
  return request('/v1/questions', {
    headers: { Authorization },
  });
}

export function saveFeedback(userId, Authorization, question) {
  return request(`/v1/users/${userId}/feedbacks`, {
    headers: Object.assign({ Authorization }, HEADER_JSON),
    method: 'POST',
    body: JSON.stringify({ question }),
  });
}

export function getCalculator(param) {
  return request(`/v1/calculator?${getParamString(param, true)}`);
}
