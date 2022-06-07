import { FATCH_ORDER_SUCCESS, FATCH_ORDERNBYID_SUCCESS } from "./actionType";
import axios from "axios";

const serverAppUrl = "http://localhost:4000";
export const setOrder = function (payload) {
  return {
    type: FATCH_ORDER_SUCCESS,
    payload,
  };
};

export const setOrderId = function (payload) {
  return {
    type: FATCH_ORDERNBYID_SUCCESS,
    payload,
  };
};

export const fetchOrder = () => {
  return (dispatch) => {
    return axios
      .get(`${serverAppUrl}/menu/order`, {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
      .then(({ data }) => {
        dispatch(setOrder(data));
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
};

export const updateStatusOrder = (id) => {
  return (dispatch) => {
    return axios
      .patch(
        `${serverAppUrl}/menu/order/status/${id}`,
        {},
        {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        }
      )
      .then(() => {
        dispatch(fetchOrder());
      });
  };
};

export const postOrder = ({ noTable, menu }) => {
  console.log(noTable, menu);
  return (dispatch) => {
    return axios
      .post(
        `${serverAppUrl}/menu/order`,
        { noTable, menu },
        {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        }
      )
      .then(() => {
        dispatch(fetchOrder());
      });
  };
};

export const editOrder = ({ noTable, menu, id }) => {
  console.log(noTable);
  return (dispatch) => {
    return axios
      .put(
        `${serverAppUrl}/menu/order/${id}`,
        { noTable, menu },
        {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        }
      )
      .then(() => {
        dispatch(fetchOrder());
      });
  };
};
