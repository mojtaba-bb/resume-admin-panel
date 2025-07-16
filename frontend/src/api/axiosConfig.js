// src/api/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // در صورت نیاز به کوکی
});

// اضافه کردن JWT به تمام درخواست‌ها (اگر وجود داشته باشه)
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // یا هر جا ذخیره‌ش کردی
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
