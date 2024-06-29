import { BASE_URL } from "../config";
import axios from 'axios';

const signup = async (user) => {
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
};

export { login, signup, getUser, getRandomUsers, updateUser };
