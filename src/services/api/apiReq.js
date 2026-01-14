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
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  // console.log("header",token)

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// دالة مساعدة للتعامل مع الاستجابات
const sendRequest = async ({
  verb,
  url,
  data = null,
  params = null,
  contentType = "application/json",
}) => {
  console.log("api request", { verb, url, data, params, contentType });
  try {
    const response = await api({
      method: verb,
      url: url,
      data: data,
      params:  params ,
      headers: {
        "Content-Type": contentType,
      },
    });
    console.log("api response", response);
    return {
      success: response.data.success,
      status: response.status,
      msg: response.data.message,
      data: response.data.data,
    };
    // the server responded with a status code out of 2xx
  } catch (error) {
    // the server responded with 422
    if (error.status == 422){
    console.log("422 response", error.response);
      return {
        success: false,
        status: error.status,
        msg: " البيانات المدخلة غير صحيحة.",
        data: error.response.data.errors,
      };    

    }
    else if (error.response) {
      console.log("api error response" , error.response);
      return {
        success: false,
        status: error.status,
        msg: error.response.data.message??  "حدث خطأ يرجى المحاولة لاحقاً.",
        data: error.response.data,
      };
    } else
      return {
        success: false,
        status: "no response",
        msg: "الخادم غير متوفر حالياً. يرجى المحاولة لاحقاً.",
        data: error.request,
      };
  }
};

export default sendRequest;
