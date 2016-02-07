import React, { Component , PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TodosView from './todos-view';
import TodosFormView from './todos-form-view';
import * as TodoActions from '../actions/todo-actions';

class HomeView extends Component {
  static propTypes = {
    user: PropTypes.any.isRequired,
    todos: PropTypes.any.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  componentWillMount () {
    if (this.props.user && this.props.user.token && this.props.todos.length === 0) {
      this.props.dispatch(TodoActions.listTodos());
    }
  };

  render () {
    const { todos, dispatch } = this.props;

    return (
      <div id="home-view">
        <h1>Todos</h1>

        <TodosView todos={todos} {...bindActionCreators(TodoActions, dispatch)}/>
        <hr/>
        <TodosFormView {...bindActionCreators(TodoActions, dispatch)}/>
      </div>
    );
  }
}

export default connect(state => ({ user: state.user, todos: state.todos }))(HomeView);
