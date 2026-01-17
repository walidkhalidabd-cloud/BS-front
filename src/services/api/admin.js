import sendRequest from "./apiReq";

const admin = {
  listClients: (status) => sendRequest({ verb: "get", url: "/clients", params: {status: status} }),
  acceptClient:  (id ) => sendRequest({ verb: "patch", url: `/clients/${id}` }),
  totals:  () =>     sendRequest({ verb: "get", url: "/totals" }),
  
};
export default admin;
