import request from 'axios';

const API_URL = 'http://localhost:5000/api/v1/users';

export function createUser (username, password, passwordConfirmation) {
  return {
    type: 'CREATE_USER',
    promise: request
      .post(API_URL, { username, password, passwordConfirmation })
  };
}

export function signinUser (username, password) {
  return {
    type: 'SIGNIN_USER',
    promise: request
      .post(`${API_URL}/signin`, { username, password })
  };
}

export function signoutUser () {
  return {
    type: 'SIGNOUT_USER',
    promise: request
      .delete(`${API_URL}/signin`)
  };
}
