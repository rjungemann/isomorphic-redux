import Immutable from 'immutable';
import * as TodoActions from '../actions/todo-actions';

const defaultState = new Immutable.List();

export default function todoReducer(state = defaultState, action) {
  switch(action.type) {
    case 'LIST_TODOS':
      return action.res.data.todos;
    case 'CREATE_TODO':
      return state.concat(action.res.data.todo);
    case 'UPDATE_TODO':
      return state.map((todo) => {
        const todo2 = action.res.data.todo;
        if (todo.id === todo2.id) {
          return todo2;
        }

        return todo;
      });
      return Object.assign({}, state, {
        [action.id]: action.text
      });
    case 'DESTROY_TODO':
      // TODO: Why do I have to call `toString()`?
      return state.filter((todo) => { return todo.id.toString() !== action.id });
    default:
      return state;
  }
}
