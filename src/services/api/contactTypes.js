import sendRequest from "./apiReq";

const contactTypes = {
  list:  () => sendRequest({verb: "get", url: "/contact-types"}),
  get:    (id) => sendRequest({verb: "get", url: `/contact-types/${id}`}),
  create:  (data) =>  sendRequest({verb:"post", url: "/contact-types", data}),
  update:  (id, data) =>  sendRequest({verb:"put", url: `/contact-types/${id}`, data}),
  remove:  (id) =>  sendRequest({verb:"delete", url:  `/contact-types/${id}`})
}
export default contactTypes;