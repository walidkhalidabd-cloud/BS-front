import sendRequest from "./apiReq";

const clients = {
  list: (status) => sendRequest({ verb: "get", url: "/clients", params: {status: status} }),
  accept:  (id ) => sendRequest({ verb: "patch", url: `/clients/${id}` }),
  
};
export default clients;
