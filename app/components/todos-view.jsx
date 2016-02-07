import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'react';
import Immutable from 'immutable';

export default class TodosView extends React.Component {
  static propTypes = {
    todos: PropTypes.any.isRequired,
    updateTodo: PropTypes.func.isRequired,
    destroyTodo: PropTypes.func.isRequired
  };

  handleDelete = (e) => {
    const id = e.target.dataset.id;

    this.props.destroyTodo(id);
  };

  handleEdit = (e) => {
    const id = Number(e.target.dataset.id);
    let text = window.prompt('', this.props.todos[id]);

    this.props.updateTodo(id, text);
  };

  render() {
    return (
      <div id="todos-list" className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Item</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {
              this.props.todos.map(function (todo) {
                const id = todo.id;
                const text = todo.text;

                return (
                  <tr key={id}>
                    <td>{text}</td>

                    <td>
                      <button className="btn btn-sm btn-danger" data-id={id} onClick={this.handleDelete}>Delete</button>
                      &nbsp;
                      <button className="btn btn-sm btn-warning" data-id={id} onClick={this.handleEdit}>Edit</button>
                    </td>
                  </tr>
                );
              }.bind(this))
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default connect(state => ({ todos: state.todos }))(TodosView);
