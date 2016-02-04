export default function todosDeleteHandler () {
  return (req, res) => {
    const store = req.app.get('store');
    const text = req.query.text;
    const newTodos = [];

    store.todos.forEach((element) => {
      if (element !== text) {
        newTodos.push(element);
      }
    });

    store.todos = newTodos;

    res.json({
      todos: store.todos
    });
  }
}
