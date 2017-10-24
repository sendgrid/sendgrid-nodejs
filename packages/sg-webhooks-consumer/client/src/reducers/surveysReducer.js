import {
  FETCH_SURVEYS
} from '../actions/types';

export default (state = [], action) => {
  if (action.type === FETCH_SURVEYS) {
    return action.payload || false;
  }
  return state;
}
