export default function todosIndexHandler () {
  return (req, res) => {
    const store = req.app.get('store');

    res.json({
      todos: store.todos
    });
  }
}
