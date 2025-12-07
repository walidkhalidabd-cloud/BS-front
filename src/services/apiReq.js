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
    return {
      success: true,
      status: response.status,
      msg: "",
      data: response.data.data,
    };
    // the server responded with a status code out of 2xx 
  } catch (error) {
      // the server responded with 422
    if (error.status == 422)      
      return {
        success: false,
        status: error.status,
        msg: "بعض الحقول غير صحيحة، يرجى التحقق.",
        data: error.response.data.errors,
      };
      // the server responded with othor
     else if (error.response)     
      return {
        success: false,
        status: response.status,
        msg: "حدث خطأ غير متوقع. يرجى المحاولة لاحقاً.",
        data: error.response.data,
      }; 
     else 
      return {
        success: false,
        status: "no response",
        msg: "الخادم غير متوفر حالياً. يرجى المحاولة لاحقاً.",
        data: error.request,
      };    
  }
};

/*********************** add project ******************** */
export const projects = {
  add: async (data) =>
    sendRequest("post", "/projects", data, "multipart/form-data"),
  list: async () => sendRequest("get", "/projects"),
  types: async () => sendRequest("get", "/project-types"),
  documentTypes: async () => sendRequest("get", "/document-types"),
  show: async (id) => sendRequest("get", `/projects/${id}`),
};
