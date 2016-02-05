import config from '../../../../../config';

export default function () {
  return (req, res) => {
    const store = req.app.get('store');
    const text = req.body.text;
    const time = req.body.time;

    store.todos.push(text);

    res.json({
      text: text
    });
  };
};
