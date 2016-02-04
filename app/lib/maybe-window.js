export default function maybeWindow (callback) {
  try {
    window;
    return callback(window);
  } catch (e) {
    return callback();
  }
}
