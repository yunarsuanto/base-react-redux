import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

if (!BASE_URL) {
  throw new Error('REACT_APP_API_BASE_URL is not defined in .env');
}
const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;
