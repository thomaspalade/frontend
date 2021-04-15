import axios from "axios";

// const API_URL = "http://localhost:8080/api/auth/";
const API_URL = "http://localhost:9997/users/";

const register = (username, email, password, firstName, lastName) => {
  return axios.post(API_URL + "register", {
    "firstName": firstName,
    "lastName": lastName,
    "email": email,
    "password": password
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "authenticate", {
      email,
      password,
    })
    .then((response) => {

      console.log(response);

      if (response.data.token) {
        console.log(JSON.stringify(response));
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};
