import * as types from '../constants/ActionTypes';

export function login(login, token, id, role) {
    return {
      type: types.LOG_IN,
      login,
      token,
      id,
      role,
    };
  }
  

  export function logout() {
    return {
      type: types.LOG_OUT,
    };
  }
  