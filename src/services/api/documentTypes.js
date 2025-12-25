import sendRequest from "./apiReq";

const documentType = {
  list:  () => sendRequest({verb: "get", url: "/document-types"}),
  get:    (id) => sendRequest({verb: "get", url: `/document-types/${id}`}),
  create:  (data) =>  sendRequest({verb:"post", url: "/document-types", data}),
  update:  (id, data) =>  sendRequest({verb:"put", url: `/document-types/${id}`, data}),
  remove:  (id) =>  sendRequest({verb:"delete", url:  `/document-types/${id}`})
}

export default documentType;