import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backend-techfocus.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;