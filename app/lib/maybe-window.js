export default function maybeWindow (callback) {
  return callback((typeof window !== 'undefined') ? window : undefined);
}
