import * as TodoActions from '../actions/todo-actions';

export default function userReducer(state = {}, action) {
  switch(action.type) {
    case 'SIGNIN_USER':
      return action.res.data.user;
    case 'SIGNOUT_USER':
      return {};
    case 'CREATE_USER':
      return action.res.data.user;
    default:
      return state;
  }
}
