import sendRequest from "./apiReq";
const customer = {
    getCustomerProjects: () => sendRequest({verb: "get" , url: "customer/getCustomerProjects"}),
    getOffers: (projectId) => sendRequest({verb: "get" , url: `"customer/getOffers/${projectId}`}),
    AcceptOffers: (projectId) => sendRequest({verb: "post" , url: `customer/AcceptOffers/${projectId}`}),
    getSteps: (projectId) => sendRequest({verb: "get" , url: `customer/getSteps/${projectId}`}),
    getClients: (roleId)=> sendRequest({verb: "get" , url: `getClients/${roleId}`}),
}
export default customer;