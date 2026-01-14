import sendRequest from "./apiReq";

const client = {
  
  getNewProjects: () => sendRequest({ verb: "get", url: "/client/getNewProjects" }),
  getProjects:  (status ) => sendRequest({ verb: "get", url: `/client/getProjects/${status}` }),  
  addOffer:  (project , data) => sendRequest({ verb: "post", url: `/client/addOffer/${project}` ,data}),  
};
export default client;
