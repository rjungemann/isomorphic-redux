import React, { PropTypes } from 'react';

export default class TodosFormView extends React.Component {
  static propTypes = {
    createTodo: PropTypes.func.isRequired
  };

  handleSubmit = (e) => {
    let node = this.refs['todo-input'];

    this.props.createTodo(node.value);

    node.value = '';

    e.preventDefault();
  };

  render() {
    return (
      <form>
        <label htmlFor="todo">What would you like to get done today?</label>
        <div className="input-group">
          <input className="form-control" id="todo" type="text" placeholder="Get milk" ref="todo-input"/>
          <span className="input-group-btn">
            <button className="btn btn-primary" type="submit" onClick={this.handleSubmit}>OK!</button>
          </span>
        </div>
      </form>
    );
  }
}
