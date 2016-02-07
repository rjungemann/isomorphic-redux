import Immutable from 'immutable';
import * as TodoActions from '../actions/todo-actions';

const defaultState = new Immutable.List();

export default function todoReducer(state = defaultState, action) {
  switch(action.type) {
    case 'LIST_TODOS':
      return new Immutable.List(action.res.data.todos);
    case 'CREATE_TODO':
      return state.concat(action.res.data.text);
    case 'UPDATE_TODO':
      return state.set(action.id, action.text);
    case 'DESTROY_TODO':
      return state.delete(action.id);
    default:
      return state;
  }
}
