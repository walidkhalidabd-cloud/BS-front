import sendRequest from "./apiReq";

const contactTypes = {
  list:  () => sendRequest({verb: "get", url: "/contactTypes"}),
  get:    (id) => sendRequest({verb: "get", url: `/contactTypes/${id}`}),
  create:  (data) =>  sendRequest({verb:"post", url: "/contactTypes", data}),
  update:  (id, data) =>  sendRequest({verb:"put", url: `/contactTypes/${id}`, data}),
  remove:  (id) =>  sendRequest({verb:"delete", url:  `/contactTypes/${id}`})
}
export default contactTypes;