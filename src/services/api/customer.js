import sendRequest from "./apiReq";
const customer = {
    getCustomerProjects: () => sendRequest({verb: "get" , url: "customer/getCustomerProjects"}),
    getOffers: (projectId) => sendRequest({verb: "get" , url: `customer/getOffers/${projectId}`}),
    acceptOffer: (projectId,offerId) => sendRequest({verb: "post" , url: `customer/acceptOffer/${projectId}/${offerId}/`}),
    getSteps: (projectId) => sendRequest({verb: "get" , url: `customer/getSteps/${projectId}`}),
    getClients: (roleId)=> sendRequest({verb: "get" , url: `getClients/${roleId}`}),
}
export default customer;