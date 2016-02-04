import React from 'react';
import { PropTypes } from 'react';
import Immutable from 'immutable';

export default class TodosView extends React.Component {
  static propTypes = {
    todos: PropTypes.instanceOf(Immutable.List).isRequired,
    editTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired
  };

  handleDelete = (e) => {
    const id = Number(e.target.dataset.id);

    this.props.deleteTodo(id);
  };

  handleEdit = (e) => {
    const id = Number(e.target.dataset.id);
    const currentVal = this.props.todos.get(id);

    // For a cutting edge UX
    let text = window.prompt('', currentVal);

    this.props.editTodo(id, text);
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
              this.props.todos.map(function (todo, index) {
                return (
                  <tr key={index}>
                    <td>{todo}</td>

                    <td>
                      <button className="btn btn-sm btn-danger" data-id={index} onClick={this.handleDelete}>Delete</button>
                      &nbsp;
                      <button className="btn btn-sm btn-warning" data-id={index} onClick={this.handleEdit}>Edit</button>
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
