import sendRequest from "./apiReq";

const accountStatuses = {
  list:  () => sendRequest({verb: "get", url: "/account-statuses"}),
  get:    (id) => sendRequest({verb: "get", url: `/account-statuses/${id}`}),
  create:  (data) =>  sendRequest({verb:"post", url: "/account-statuses", data}),
  update:  (id, data) =>  sendRequest({verb:"put", url: `/account-statuses/${id}`, data}),
  remove:  (id) =>  sendRequest({verb:"delete", url:  `/account-statuses/${id}`})
}
export default accountStatuses;