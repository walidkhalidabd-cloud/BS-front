import sendRequest from "./apiReq";

const client = {
  getTotals: () => sendRequest({ verb: "get", url: "/client/getTotals" }),
  getNewProjects: () => sendRequest({ verb: "get", url: "/client/getNewProjects" }),
  isActive:  () => sendRequest({ verb: "get", url: `/client/isActive` }),  
  getProjects:  (status ) => sendRequest({ verb: "get", url: `/client/getProjects/${status}` }),  
  addOffer:  (project , data) => sendRequest({ verb: "post", url: `/client/addOffer/${project}` ,data ,contentType: "multipart/form-data"}),  
};
export default client;
