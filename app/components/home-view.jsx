import React, { Component , PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TodosView from './todos-view';
import TodosFormView from './todos-form-view';
import * as TodoActions from '../actions/todo-actions';

class HomeView extends Component {
  static propTypes = {
    todos: PropTypes.any.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  static needs = [
    TodoActions.getTodos
  ];

  render() {
    const { todos, dispatch } = this.props;

    return (
      <div id="todo-list">
        <TodosView todos={todos} {...bindActionCreators(TodoActions, dispatch)}/>
        <hr/>
        <TodosFormView {...bindActionCreators(TodoActions, dispatch)}/>
      </div>
    );
  }
}

export default connect(state => ({ todos: state.todos }))(HomeView)
