import {
  FATCH_TRANSACTION_SUCCESS,
  FATCH_TRANSACTIONBYID_SUCCESS,
} from "./actionType";
import axios from "axios";

const serverAppUrl = "http://localhost:4000";
export const getTransaction = function (payload) {
  return {
    type: FATCH_TRANSACTION_SUCCESS,
    payload,
  };
};

export const getTransactionById = function (payload) {
  return {
    type: FATCH_TRANSACTIONBYID_SUCCESS,
    payload,
  };
};

export const fetchTransaction = () => {
  return (dispatch) => {
    return axios
      .get(`${serverAppUrl}/transaction`, {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
      .then(({ data }) => {
        dispatch(getTransaction(data));
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
};

export const deleteTransaction = (id) => {
  return (dispatch) => {
    return axios
      .delete(`${serverAppUrl}/transaction/${id}`, {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
      .then(() => {
        dispatch(fetchTransaction());
      });
  };
};

export const postTransaction = ({ ItemId, total }) => {
  return (dispatch) => {
    return axios
      .post(
        `${serverAppUrl}/transaction`,
        { ItemId, total },
        {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        }
      )
      .then(() => {
        dispatch(fetchTransaction());
      });
  };
};

export const editTransaction = ({ CompanyId, ItemId, id, total }) => {
  return (dispatch) => {
    return axios
      .put(
        `${serverAppUrl}/transaction/${id}`,
        { CompanyId, ItemId, total },
        {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        }
      )
      .then(() => {
        dispatch(fetchTransaction());
      });
  };
};
