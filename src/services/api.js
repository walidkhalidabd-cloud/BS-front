// src/services/api.js
import axios from "axios";

/* get from .env laravel URL */
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000/api";

// إعداد axios الأساسي مع التهيئات اللازمة
const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// دالة مساعدة للتعامل مع الاستجابات  
const makeApiRequest = async (verb, url, data = null) => {
  const response = await api({
    method: verb,
    url: url,
    data: data,
  });
  if (response.data.success) {
    return response.data.data; // Return only the data part
  } else {
    throw new Error(response.data.message || "API Error"); // Throw error for components to catch
  }
};


/*********************** add project ******************** */
export const projects = {
  add: async (data) => makeApiRequest('post', '/projects' , data),
  list: async (data) => makeApiRequest('get', '/projects' ),
  type: async () => makeApiRequest('get', '/project-types' )
}