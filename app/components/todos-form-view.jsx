import React, { PropTypes } from 'react';

export default class TodosFormView extends React.Component {
  static propTypes = {
    createTodo: PropTypes.func.isRequired
  };

  handleSubmit = () => {
    let node = this.refs['todo-input'];

    this.props.createTodo(node.value);

    node.value = '';
  };

  render() {
    return (
      <div className="well">
        <form>
          <fieldset className="form-group">
            <input className="form-control" id="todo" type="text" placeholder="What would you like to get done?" ref="todo-input"/>
          </fieldset>

          <input className="btn btn-primary" type="submit" value="OK!" onClick={this.handleSubmit}/>
        </form>
      </div>
    );
  }
}
