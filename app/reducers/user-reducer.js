import Immutable from 'immutable';
import * as TodoActions from '../actions/todo-actions';

const defaultState = new Immutable.List();

export default function userReducer(state = defaultState, action) {
  switch(action.type) {
    case 'SIGNIN_USER':
      return new action.res.data.user;
    case 'SIGNOUT_USER':
      return undefined;
    case 'CREATE_USER':
      return new action.res.data.user;
    default:
      return state;
  }
}
