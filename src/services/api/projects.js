import sendRequest from "./apiReq";

export const projects = {
  add: async (data) =>
    sendRequest({verb: "post", url: "/projects", data, contentType: "multipart/form-data"}),
  list: async () => sendRequest({verb: "get", url: "/projects"}),
  show: async (id) => sendRequest({verb: "get", url: `/projects/${id}`}),
};

export default projects;
