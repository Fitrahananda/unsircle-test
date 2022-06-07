import { FATCH_COMPANY_SUCCESS, FATCH_COMPANYBYID_SUCCESS } from "./actionType";
import axios from "axios";

const serverAppUrl = "http://localhost:4000";
export const getCompany = function (payload) {
  return {
    type: FATCH_COMPANY_SUCCESS,
    payload,
  };
};

export const getCompanyById = function (payload) {
  return {
    type: FATCH_COMPANYBYID_SUCCESS,
    payload,
  };
};

export const fetchCompany = () => {
  return (dispatch) => {
    return axios
      .get(`${serverAppUrl}/company`, {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
      .then(({ data }) => {
        dispatch(getCompany(data));
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
};

export const deleteCompany = (id) => {
  return (dispatch) => {
    return axios
      .delete(`${serverAppUrl}/company/${id}`, {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
      .then(() => {
          dispatch(getCompany(false));
      })
  };
};

export const postCompany = (data) => {
  return (dispatch) => {
    return axios
      .post(
        `${serverAppUrl}/company`,
        {
          name: data.companyName,
          address: data.companyAddress,
          description: data.companyDescription,
        },
        {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        }
      )
      .then(() => {
        dispatch(fetchCompany());
      });
  };
};

export const editCompany = (data) => {
  return (dispatch) => {
    return axios
      .put(
        `${serverAppUrl}/company/${data.id}`,

        {
          name: data.companyName,
          address: data.companyAddress,
          description: data.companyDescription,
        },
        {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        }
      )
      .then(() => {
        dispatch(fetchCompany());
      });
  };
};
