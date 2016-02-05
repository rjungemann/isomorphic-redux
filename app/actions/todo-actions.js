import request from 'axios';

const API_URL = 'http://localhost:5000/api/v1/todos';

export function getTodos() {
  return {
    type: 'GET_TODOS',
    promise: request.get(API_URL)
  }
}

export function createTodo(text) {
  return {
    type: 'CREATE_TODO',
    promise: request.post(API_URL, { time: Date.now(), text })
  };
}

export function editTodo(id, oldText, text) {
  return {
    type: 'EDIT_TODO',
    id,
    text,
    date: Date.now(),
    promise: request.put(`${API_URL}/${id}`, { id, text, old_text: oldText })
  };
}

export function deleteTodo(id, text) {
  return {
    type: 'DELETE_TODO',
    id,
    text,
    promise: request.delete(`${API_URL}/${id}`, { params: { id, text }})
  };
}
