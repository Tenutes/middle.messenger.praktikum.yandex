import { Action } from '../common/Store/Store';
import { parseError } from './helpers';

const SET_PROFILE_RESPONSE = 'profile/SET';

export const setResponse = (response: { success?: string; error?: string }) => ({
  type: SET_PROFILE_RESPONSE,
  payload: response,
});

export default (state = { error: null, success: null }, action: Action) => {
  switch (action.type) {
    case SET_PROFILE_RESPONSE:
      let { success, error } = action.payload;

      if (error) {
        error = parseError({ reason: error }).reason;
      }
      return { ...state, success, error };
    default:
      return state;
  }
};
