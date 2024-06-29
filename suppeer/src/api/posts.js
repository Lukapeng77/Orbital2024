import { BASE_URL } from "../config";
import axios from "axios";

const getUserLikedPosts = async (likerId, token, query) => {
  try {
      const response = await axios.get(BASE_URL + `api/posts/liked/${likerId}`, {
          params: query,
          headers: { "x-access-token": token }
      });
      return response.data;
  } catch (err) {
      console.error(err);
  }
};

const getPosts = async (token, query) => {
  try {
      const response = await axios.get(BASE_URL + "api/posts", {
          params: query,
          headers: { "x-access-token": token }
      });
      return response.data;
  } catch (err) {
      console.error(err);
  }
};

const getPost = async (postId, token) => {
  try {
      const response = await axios.get(BASE_URL + `api/posts/${postId}`, {
          headers: { "x-access-token": token }
      });
      return response.data;
  } catch (err) {
      console.error(err);
  }
};

const getUserLikes = async (postId, anchor) => {
  try {
      const response = await axios.get(BASE_URL + `api/posts/like/${postId}/users`, {
          params: { anchor }
      });
      return response.data;
  } catch (err) {
      console.error(err);
  }
};

const createPost = async (post, user) => {
  try {
      const response = await axios.post(BASE_URL + "api/posts", post, {
          headers: {
              "Content-Type": "application/json",
              "x-access-token": user.token
          }
      });
      return response.data;
  } catch (err) {
      console.error(err);
  }
};

const updatePost = async (postId, user, data) => {
  try {
      const response = await axios.patch(BASE_URL + `api/posts/${postId}`, data, {
          headers: {
              "Content-Type": "application/json",
              "x-access-token": user.token
          }
      });
      return response.data;
  } catch (err) {
      console.error(err);
  }
};

const deletePost = async (postId, user) => {
  try {
      const response = await axios.delete(BASE_URL + `api/posts/${postId}`, {
          headers: { "x-access-token": user.token }
      });
      return response.data;
  } catch (err) {
      console.error(err);
  }
};

const getComments = async (params) => {
  try {
      const response = await axios.get(BASE_URL + `api/comments/post/${params.id}`);
      return response.data;
  } catch (err) {
      console.error(err);
  }
};

const getUserComments = async (params) => {
  try {
      const response = await axios.get(BASE_URL + `api/comments/user/${params.id}`, {
          params: params.query
      });
      return response.data;
  } catch (err) {
      console.error(err);
  }
};

const createComment = async (comment, params, user) => {
  try {
      const response = await axios.post(BASE_URL + `api/comments/${params.id}`, comment, {
          headers: {
              "Content-Type": "application/json",
              "x-access-token": user.token
          }
      });
      return response.data;
  } catch (err) {
      console.error(err);
  }
};

const updateComment = async (commentId, user, data) => {
  try {
      const response = await axios.patch(BASE_URL + `api/comments/${commentId}`, data, {
          headers: {
              "Content-Type": "application/json",
              "x-access-token": user.token
          }
      });
      return response.data;
  } catch (err) {
      console.error(err);
  }
};

const deleteComment = async (commentId, user) => {
  try {
      const response = await axios.delete(BASE_URL + `api/comments/${commentId}`, {
          headers: { "x-access-token": user.token }
      });
      return response.data;
  } catch (err) {
      console.error(err);
  }
};

const likePost = async (postId, user) => {
  try {
      const response = await axios.post(BASE_URL + `api/posts/like/${postId}`, {}, {
          headers: { "x-access-token": user.token }
      });
      return response.data;
  } catch (err) {
      console.error(err);
  }
};

const unlikePost = async (postId, user) => {
  try {
      const response = await axios.delete(BASE_URL + `api/posts/like/${postId}`, {
          headers: { "x-access-token": user.token }
      });
      return response.data;
  } catch (err) {
      console.error(err);
  }
};

export {
  getPost,
  createPost,
  updatePost,
  deletePost,
  getPosts,
  getUserComments,
  getUserLikedPosts,
  getComments,
  createComment,
  deleteComment,
  updateComment,
  likePost,
  unlikePost,
  getUserLikes,
};
