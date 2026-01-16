import sendRequest from "./apiReq";

const admin = {
  listClients: (status) => sendRequest({ verb: "get", url: "/clients", params: {status: status} }),
  acceptClient:  (id ) => sendRequest({ verb: "patch", url: `/clients/${id}` }),
  
};
export default admin;
