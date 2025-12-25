import sendRequest from "./apiReq";

const authentication = {
  login:  (data) => sendRequest({verb: "post", url: "/login", data}),            
  register: (data) =>  sendRequest({verb:"post", url: "/register", data , contentType:"multipart/form-data"}),      
  logout: () =>  sendRequest({verb:"post", url:"/logout"}),
  currentUser: () =>  localStorage.getItem("name"),
  currentUserType: () => {
    const raw = localStorage.getItem("type");
    return raw ? JSON.parse(raw) : null;
  },
};

export default authentication;


