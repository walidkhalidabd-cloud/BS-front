import sendRequest from "./apiReq";

const accountStatuses = {
  list:  () => sendRequest({verb: "get", url: "/accountStatuses"}),
  get:    (id) => sendRequest({verb: "get", url: `/accountStatuses/${id}`}),
  create:  (data) =>  sendRequest({verb:"post", url: "/accountStatuses", data}),
  update:  (id, data) =>  sendRequest({verb:"put", url: `/accountStatuses/${id}`, data}),
  remove:  (id) =>  sendRequest({verb:"delete", url:  `/accountStatuses/${id}`})
}
export default accountStatuses;