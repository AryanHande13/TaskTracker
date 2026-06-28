import axios from 'axios';

const api = axios.create({
  baseURL: 'https://tasktracker-backend-m10i.onrender.com/api',
});

export default api;
