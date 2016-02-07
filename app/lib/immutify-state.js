import { fromJS } from 'immutable';
import assign from 'object-assign';

Object.assign = Object.assign || assign;

// Abstraction to handle pre-composed state received from server while leaving
// top-level keys untouched.
export default function immutifyState(obj) {
  return obj;
}
