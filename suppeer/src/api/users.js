import { BASE_URL } from "../config";
import axios from 'axios';

const signup = async (user) => {
  try {
    const res = await fetch(BASE_URL + "api/users/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const login = async (user) => {
  try {
    const res = await fetch(BASE_URL + "api/users/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const getUser = async (params) => {
  try {
    const res = await fetch(BASE_URL + "api/users/" + params.id);
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

const getRandomUsers = async (query) => {
  try {
    const res = await fetch(
      BASE_URL + "api/users/random?" + new URLSearchParams(query)
    );
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

const updateUser = async (user, data) => {
  try {
    const res = await fetch(BASE_URL + "api/users/" + user._id, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user.token,
      },
      body: JSON.stringify(data),
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

/*const signup = async (user) => {
    try {
        const response = await axios.post(BASE_URL + "api/users/register", user);
        return response.data;
    } catch (err) {
        console.error(err);
    }
};

const login = async (user) => {
  try {
      const response = await axios.post(BASE_URL + "api/users/login", user);
      return response.data;
  } catch (err) {
      console.error(err);
  }
};

const getUser = async (params) => {
  try {
      const response = await axios.get(BASE_URL + "api/users/" + params.id);
      return response.data;
  } catch (err) {
      console.error(err);
  }
};

const getRandomUsers = async (query) => {
  try {
      const response = await axios.get(BASE_URL + "api/users/random?" + new URLSearchParams(query));
      return response.data;
  } catch (err) {
      console.error(err);
  }
};

const updateUser = async (user, data) => {
  try {
      const response = await axios.patch(BASE_URL + "api/users/" + user._id, data, {
          headers: {
              "x-access-token": user.token,
          }
      });
      return response.data;
  } catch (err) {
      console.error(err);
  }
};*/

export { login, signup, getUser, getRandomUsers, updateUser };
