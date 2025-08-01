// contains functions to make requests to backend's authentication endpoints
import { baseUrl } from "./constants";
import { checkResponse } from "./api";

export const signUp = (email, password, name, avatar) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name, avatar }),
  }).then(checkResponse);
};

export const signIn = (email, password) => {
  console.log(email);
  console.log(password);
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
};

export const checkToken = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
  // ((res) => {
  //   if (res.ok) {
  //     return res.json();
  //   }
  //   return Promise.reject(`Error: ${res.status}`);
  // });
};
