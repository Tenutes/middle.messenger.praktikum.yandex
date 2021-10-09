import { Action } from '../common/Store/Store';
import { UserData } from '../api/AuthAPI';
import { parseError } from './helpers';

const SET_USER = 'user/SET';
const DELETE_USER = 'user/DELETE';
const SET_ERROR = 'user/SET_ERROR';

export interface UserState {
  profile?: UserData;
  error?: { reason: string };
}

const defaultState = { profile: null, error: null };

export const setUser = (user: UserData) => ({
  type: SET_USER,
  payload: user,
});

export const deleteUser = () => ({
  type: DELETE_USER,
});

export const setError = (error: { reason: string }) => ({
  type: SET_ERROR,
  payload: error,
});

export default (state = defaultState, action: Action) => {
  switch (action.type) {
    case SET_USER:
      return { error: null, profile: action.payload };
    case DELETE_USER:
      return { profile: null, error: null };
    case SET_ERROR:
      const error = parseError(action.payload);
      return { ...state, error };
    default:
      return state;
  }
};
