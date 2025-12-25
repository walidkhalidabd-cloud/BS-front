import sendRequest from "./apiReq";

const roles = {
  list:  () => sendRequest({verb: "get", url: "/roles"}),
  get:    (id) => sendRequest({verb: "get", url: `/roles/${id}`}),
  create:  (data) =>  sendRequest({verb:"post", url: "/roles", data}),
  update:  (id, data) =>  sendRequest({verb:"put", url: `/roles/${id}`, data}),
  remove:  (id) =>  sendRequest({verb:"delete", url:  `/roles/${id}`})
}
export default roles;