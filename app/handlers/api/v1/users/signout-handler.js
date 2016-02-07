export default function () {
  return (req, res) => {
    req.session.user = undefined;
    res.json({
      message: 'Successfully signed out.'
    });
  }
}

