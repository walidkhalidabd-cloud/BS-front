import sendRequest from "./apiReq";

const providers = {
  list: (status) => sendRequest({ verb: "get", url: "/providers", params: {status: status} }),
  changeStatus:  (id , status) =>
    sendRequest({ verb: "patch", url: `/providers/${id}` , data: status}),
  
};
export default providers;
