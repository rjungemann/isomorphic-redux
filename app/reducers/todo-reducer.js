import Immutable from 'immutable';
import { UPDATE_LOCATION } from 'react-router-redux'
import * as TodoActions from '../actions/todo-actions';

const defaultState = new Immutable.List();

export default function todoReducer(state = defaultState, action) {
  switch(action.type) {
    case UPDATE_LOCATION:
      return state;
    case 'GET_TODOS':
      return new Immutable.List(action.res.data.todos);
    case 'CREATE_TODO':
      return state.concat(action.res.data.text);
    case 'EDIT_TODO':
      return state.set(action.id, action.text);
    case 'DELETE_TODO':
      return state.delete(action.id);
    default:
      return state;
  }
}
