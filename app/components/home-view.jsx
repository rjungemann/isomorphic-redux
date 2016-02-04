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

  componentWillMount () {

  }

  render () {
    const { todos, dispatch } = this.props;

    console.log(todos, todos.size);

    if (todos.size) {
      return (
        <div id="home-view">
          <TodosView todos={todos} {...bindActionCreators(TodoActions, dispatch)}/>
          <hr/>
          <TodosFormView {...bindActionCreators(TodoActions, dispatch)}/>
        </div>
      );
    } else {
      dispatch(TodoActions.getTodos());

      return <p>Loading...</p>;
    }
  }
}

export default connect(state => ({ todos: state.todos }))(HomeView);
