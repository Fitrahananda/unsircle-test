import { FATCH_MENU_SUCCESS, FATCH_MENUBYID_SUCCESS } from "./actionType";
import axios from "axios";

const serverAppUrl = "http://localhost:4000";
export const getMenu = function (payload) {
  return {
    type: FATCH_MENU_SUCCESS,
    payload,
  };
};

export const getMenuId = function (payload) {
  return {
    type: FATCH_MENUBYID_SUCCESS,
    payload,
  };
};

export const fetchMenu = () => {
  return (dispatch) => {
    return axios
      .get(`${serverAppUrl}/menu`, {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
      .then(({ data }) => {
        dispatch(getMenu(data));
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
};

export const postMenu = ({ name, category, status }) => {
  return (dispatch) => {
    return axios
      .post(
        `${serverAppUrl}/menu`,
        { name, category, status },
        {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        }
      )
      .then(() => {
        dispatch(fetchMenu());
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
};

export const editMenu = ({ name, category, status, id }) => {
  return (dispatch) => {
    return axios
      .put(
        `${serverAppUrl}/menu/${id}`,
        { name, category, status },
        {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        }
      )
      .then(() => {
        dispatch(fetchMenu());
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
};

export const deleteMenu = (id) => {
  console.log(id);
  return (dispatch) => {
    return axios
      .delete(`${serverAppUrl}/menu/${id}`, {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
      .then(() => {
        dispatch(fetchMenu());
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
};
