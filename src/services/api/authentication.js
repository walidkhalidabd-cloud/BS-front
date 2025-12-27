import sendRequest from "./apiReq";

const authentication = {
  login: (data) => sendRequest({ verb: "post", url: "/login", data }),
  register: (data) =>
    sendRequest({
      verb: "post",
      url: "/register",
      data,
      contentType: "multipart/form-data",
    }),
  logout:async () => {
    await sendRequest({ verb: "post", url: "/logout" });
    localStorage.removeItem("token");
  },
  currentUser: () => localStorage.getItem("name"),
  currentUserType: () => localStorage.getItem("type"),

  isAuthenticated: () => localStorage.getItem("name") !== null,
  isAuthorized: (type) => localStorage.getItem("type") === type,
};

export default authentication;
