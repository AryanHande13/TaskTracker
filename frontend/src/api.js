import axios from 'axios';

const api = axios.create({
  baseURL: 'https://tasktracker-backend-1kgi.onrender.com/api',
});

export default api;
