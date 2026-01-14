import sendRequest from "./apiReq";

const admin = {
  listClients: (status) => sendRequest({ verb: "get", url: "/admin/clients", params: {status: status} }),
  acceptClient:  (id ) => sendRequest({ verb: "patch", url: `/admin/clients/${id}` }),
  
};
export default admin;
