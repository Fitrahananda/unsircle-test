import { FATCH_ITEM_SUCCESS, FATCH_ITEMBYID_SUCCESS } from "./actionType";
import axios from "axios";

const serverAppUrl = "http://localhost:4000";
export const getItem = function (payload) {
  return {
    type: FATCH_ITEM_SUCCESS,
    payload,
  };
};

export const getItemById = function (payload) {
  return {
    type: FATCH_ITEMBYID_SUCCESS,
    payload,
  };
};

export const fetchItem = () => {
  return (dispatch) => {
    return axios
      .get(`${serverAppUrl}/item`, {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
      .then(({ data }) => {
        console.log(data);
        dispatch(getItem(data));
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
};

export const deleteItem = (id) => {
  return (dispatch) => {
    return axios
      .delete(`${serverAppUrl}/item/${id}`, {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
      .then(() => {
        dispatch(fetchItem());
      });
  };
};

export const postItem = (data) => {
  return (dispatch) => {
    return axios
      .post(
        `${serverAppUrl}/item`,
        { name: data.itemName, stock: data.itemStock },
        {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        }
      )
      .then(() => {
        dispatch(fetchItem());
      });
  };
};

export const editItem = (data) => {
  return (dispatch) => {
    return axios
      .put(
        `${serverAppUrl}/item/${data.id}`,
        { name: data.itemName, stock: data.itemStock },
        {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        }
      )
      .then(() => {
        dispatch(fetchItem());
      });
  };
};

export const catagoryList = () => {
  return (dispatch) => {};
};
