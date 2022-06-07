import axios from "axios";

const serverAppUrl = "http://localhost:4000";

export const getToken = (data) => {
  return axios
    .post(`${serverAppUrl}/user/login`, {
      email: data.email,
      password: data.password,
    })
    .then(({ data }) => {
      localStorage.setItem("access_token", data.access_token);
    });
};

export const registerUser = (data) => {
  return axios.post(`${serverAppUrl}/user/register`, {
    email: data.email,
    password: data.password,
    role: data.role,
  });
};
