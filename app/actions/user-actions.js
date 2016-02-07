import request from 'axios';

const API_URL = `${ENV.apiEndpoint}/users`;

export function createUser (username, password, passwordConfirmation) {
  return {
    type: 'CREATE_USER',
    promise: request
      .post(API_URL, { username, password, password_confirmation: passwordConfirmation })
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
