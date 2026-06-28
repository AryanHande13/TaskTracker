import axios from 'axios';

const api = axios.create({
  baseURL: 'https://tasktracker-2-libn.onrender.com',
});

export default api;
