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
import axios from "axios";
import Cookies from "js-cookie";

export const restoreAuth = (authToken) => (dispatch) => {
  dispatch({ type: RESTORE_AUTH, payload: authToken });
};

export const login = (userData) => (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  return axios
    .post("https://greenmentor-1-q72w.onrender.com/user/login", userData)
    .then((res) => {
      dispatch({ type: LOGIN_SUCCESS, payload: res.data.token });
      Cookies.set("savedtok", res.data.token, { expires: 1 });
      console.log(res.data);
    })
    .catch((err) => {
      dispatch({ type: LOGIN_FAILURE, payload: err.response.data.msg });
      console.log(err.response.data.msg);
      throw err;
    });
};

export const register = (data) => (dispatch) => {
  dispatch({ type: REG_REQUEST });
  return axios
    .post("https://greenmentor-1-q72w.onrender.com/user/register", data)
    .then((res) => {
      dispatch({ type: REG_SUCCESS });
    })
    .catch((err) => {
      dispatch({ type: REG_FAILURE, payload: err.response.data.msg });
      console.log(err.response.data.msg);
      throw err;
    });
};

export const getUser = (token) => (dispatch) => {
  dispatch({ type: GET_USER_REQ });

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return axios
    .get("https://greenmentor-1-q72w.onrender.com/user/userdata", config)
    .then((res) => {
      dispatch({ type: GET_USER_SUCCC, payload: res.data });
      console.log(res.data);
    })
    .catch((error) => {
      dispatch({ type: GET_USER_FAIL });
    });
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT_SUCCESS });

  Cookies.remove("savedtok");
};

// export const postTask = (taskdata) => (dispatch) => {
//     dispatch({type : TASK_REQUEST})

//     return axios
//     .post("http://localhost:9090/task/addTask" , taskdata)
//     .then((res) => {
//         dispatch({type : TASK_SUCCESS , payload : res.data})
//         console.log(res.data)

//     })
//     .catch((error)=>{
//         dispatch({type : TASK_FAIL})
//     })
// }

export const postTask = (taskdata) => (dispatch) => {
  dispatch({ type: TASK_REQUEST });

  const token = Cookies.get("savedtok");

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return axios
    .post(
      "https://greenmentor-1-q72w.onrender.com/task/addTask",
      taskdata,
      config
    )
    .then((res) => {
      dispatch({ type: TASK_SUCCESS, payload: res.data });
      console.log(res.data);
    })
    .catch((err) => {
      dispatch({ type: TASK_FAIL , payload : err.response.data.msg });
    });
};

export const getTask = () => (dispatch) => {
  dispatch({ type: TASK_GET_REQ });

  const token = Cookies.get("savedtok");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axios
    .get("https://greenmentor-1-q72w.onrender.com/task/usertask", config)
    .then((res) => {
      dispatch({ type: TASK_GET_SUCC, payload: res.data });
      console.log(res.data);
    })
    .catch((err) => {
      dispatch({ type: TASK_GET_FAIL });
    });
};

export const deleteTask = (userID) => (dispatch) => {
  console.log("Deleting user Id", userID);
  dispatch({ type: TASK_DEL_REQ });
  return axios
    .delete(`https://greenmentor-1-q72w.onrender.com/task/deleteTask/${userID}`)
    .then((res) => {
      dispatch({ type: TASK_DEL_SUCC , payload:res.data });
    })
    .catch((err) => {
      dispatch({ type: TASK_DEL_FAIL });
      throw err;
    });
};

export const editTask = (taskID, updateTask) => (dispatch) => {
  dispatch({ type: TASK_EDIT_REQ });

  return axios
    .patch(
      `https://greenmentor-1-q72w.onrender.com/task/updateTask/${taskID}`,
      updateTask
    )
    .then((res) => {
      dispatch({ type: TASK_EDIT_SUCC, payload: res.data });
      console.log(res.data);
    })
    .catch((err) => {
      dispatch({ type: TASK_EDIT_FAIL });
    });
};
