import axios from 'axios';

const API_URL = `https://weldon-backend-45e0a2dcb575.herokuapp.com`;

export const signUp = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, { username, email, password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const signIn = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/signin`, { username, password });
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const verifyToken = async (token) => {
  try {
    const response = await axios.post(`${API_URL}/verify-token`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
