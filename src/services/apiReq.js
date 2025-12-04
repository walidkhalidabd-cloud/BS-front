// src/services/api.js
import axios from "axios";

/* get from .env laravel URL */
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000/api";

// إعداد axios الأساسي مع التهيئات اللازمة
const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

// دالة مساعدة للتعامل مع الاستجابات
const sendRequest = async (
  verb,
  url,
  data = null,
  contentType = "application/json"
) => {
  try {
    const response = await api({
      method: verb,
      url: url,
      data: data,
      headers: {
        "Content-Type": contentType,
      },
    });
    return { success: true, status: response.status, data: response.data.data }; // Return only the data part
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
        return { success: false, status: error.response.status, data: error.response.data }; // Return only the data part      
    } else 
      // The request was made but no response was received
      return { success: false, status: "no response", data: error.request }; // Return only the data part      
    }    
  }

/*********************** add project ******************** */
export const projects = {
  add: async (data) =>
    sendRequest("post", "/projects", data, "multipart/form-data"),
  list: async () => sendRequest("get", "/projects"),
  types: async () => sendRequest("get", "/project-types"),
  documentTypes: async () => sendRequest("get", "/document-types"),
  show: async (id) => sendRequest("get", `/projects/${id}`),
};
