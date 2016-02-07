import Immutable from 'immutable';
import * as TodoActions from '../actions/todo-actions';

const defaultState = new Immutable.List();

export default function userReducer(state = defaultState, action) {
  switch(action.type) {
    case 'SIGNIN_USER':
      console.log('User signed in. TODO');
      return state;
    case 'CREATE_USER':
      console.log('User signed in. TODO');
      return state;
    default:
      return state;
  }
}
