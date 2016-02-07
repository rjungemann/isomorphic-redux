import request from 'axios';

const API_URL = `${ENV.apiEndpoint}/todos`;

export function listTodos() {
  return {
    type: 'LIST_TODOS',
    promise: request.get(API_URL)
  }
}

export function createTodo(text) {
  return {
    type: 'CREATE_TODO',
    promise: request.post(API_URL, { time: Date.now(), text })
  };
}

export function updateTodo(id, text) {
  return {
    type: 'UPDATE_TODO',
    id,
    text,
    date: Date.now(),
    promise: request.put(`${API_URL}/${id}`, { id, text })
  };
}

export function destroyTodo(id) {
  return {
    type: 'DESTROY_TODO',
    id,
    promise: request.delete(`${API_URL}/${id}`, { params: { id }})
  };
}
