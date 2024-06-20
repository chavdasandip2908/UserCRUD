// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:3001/api/users';

export const fetchUsers = () => axios.get(API_URL);
export const fetchUser = (id) => axios.get(`${API_URL}/${id}`);
export const createUser = (user) => axios.post(API_URL, user);
export const updateUser = (id, user) => axios.put(`${API_URL}/${id}`, user);
export const deleteUser = (id) => axios.delete(`${API_URL}/${id}`);
export const searchUsers = (query) => axios.get(`${API_URL}/find?q=${query}`);
export const filterUsers = (filter) => axios.post(`${API_URL}/filter`, filter);
