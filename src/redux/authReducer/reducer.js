import {
  GET_USER_FAIL,
  GET_USER_REQ,
  GET_USER_SUCCC,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REG_FAILURE,
  REG_REQUEST,
  REG_SUCCESS,
  RESTORE_AUTH,
  TASK_DEL_FAIL,
  TASK_DEL_REQ,
  TASK_DEL_SUCC,
  TASK_EDIT_FAIL,
  TASK_EDIT_REQ,
  TASK_EDIT_SUCC,
  TASK_FAIL,
  TASK_GET_FAIL,
  TASK_GET_REQ,
  TASK_GET_SUCC,
  TASK_REQUEST,
  TASK_SUCCESS,
  
} from "./actionTypes";

const initialState = {
  isLoading: false,
  isError: false,
  auth: false,
  token: "",
  user: [],
  task: [],
  gettask: [],
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        token: payload,
        auth: true,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    case REG_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };

    case REG_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
      };

    case REG_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    case GET_USER_REQ:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };

    case GET_USER_SUCCC:
      return {
        ...state,
        isLoading: false,
        user: payload,
        isError: false,
      };

    case GET_USER_FAIL:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    case RESTORE_AUTH:
      return {
        ...state,
        token: payload,
        auth: true,
      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        token: "",
        auth: false,
        gettask: [],
      };

    case TASK_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case TASK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        task: payload,
        isError: false,
      };
    case TASK_FAIL:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    case TASK_GET_REQ:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };

    case TASK_GET_SUCC:
      return {
        ...state,
        isLoading: false,
        gettask: payload,
        isError: false,
      };

    case TASK_GET_FAIL:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    case TASK_DEL_REQ:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };

    case TASK_DEL_SUCC:
      return {
        ...state,
        isLoading: false,
        gettask: [],
        isError: false,
      };

    case TASK_DEL_FAIL:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    case TASK_EDIT_REQ:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };

    case TASK_EDIT_SUCC:
      return {
        ...state,
        task: payload,
        isLoading: false,
        isError: false,
      };

    case TASK_EDIT_FAIL:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };


    default:
      return state;
  }
};
