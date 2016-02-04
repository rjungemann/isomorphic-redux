export default function todosUpdateHandler () {
  return (req, res) => {
    const store = req.app.get('store');
    const oldText = req.body.old_text;
    const text = req.body.text;
    const newTodos = [];

    store.todos.forEach((element) => {
      if (element === oldText) {
        newTodos.push(text);
      } else {
        newTodos.push(element);
      }
    });

    store.todos = newTodos;

    res.json({
      todos: store.todos
    });
  }
}
