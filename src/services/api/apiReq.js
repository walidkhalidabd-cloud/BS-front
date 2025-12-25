// src/services/api.js
import axios from "axios";

/* get from .env laravel URL */
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000/api";

// إعداد axios الأساسي مع التهيئات اللازمة
const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

// // إضافة التوكن إلى رؤوس الطلبات
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// دالة مساعدة للتعامل مع الاستجابات
const sendRequest = async ({
  verb,
  url,
  data = null,
  params = null,
  contentType = "application/json"}) => {
  try {
    const response = await api({
      method: verb,
      url: url,
      data: data,
      headers: {
        "Content-Type": contentType,
      },
    });  
    // console.log("api response" , response); 
    return {
      success: true,
      status: response.status,
      msg: response.data.message,
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
      // the server responded with other
     else if (error.response)     
      return {
        success: false,
        status: error.status,
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

export default sendRequest;