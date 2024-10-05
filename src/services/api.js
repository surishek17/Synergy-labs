import axios from 'axios';

// Base URL for JSONPlaceholder API
const API_URL = 'https://jsonplaceholder.typicode.com/users';

// Fetch all users
export const fetchUsers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Fetch a single user by ID
export const fetchUserById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Create a new user
export const createUser = async (userData) => {
  const response = await axios.post(API_URL, userData);
  // JSONPlaceholder returns the created object with an ID
  return response.data;
};

// Update an existing user
export const updateUser = async (id, userData) => {
  const response = await axios.put(`${API_URL}/${id}`, userData);
  return response.data;
};

// Delete a user
export const deleteUser = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
