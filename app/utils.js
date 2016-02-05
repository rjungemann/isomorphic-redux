import bigInt from 'big-integer';
import uuid from 'uuid';

export function thirtySix () {
  return bigInt(uuid.v4().replace(/-/g, ''), 16).toString(36);
}
