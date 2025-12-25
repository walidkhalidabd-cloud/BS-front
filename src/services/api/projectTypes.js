import sendRequest from "./apiReq";

const projectType = {
  list:  () => sendRequest({verb: "get", url: "/project-types"}),
  get:    (id) => sendRequest({verb: "get", url: `/project-types/${id}`}),
  create:  (data) =>  sendRequest({verb:"post", url: "/project-types", data}),
  update:  (id, data) =>  sendRequest({verb:"put", url: `/project-types/${id}`, data}),
  remove:  (id) =>  sendRequest({verb:"delete", url:  `/project-types/${id}`})
}

export default projectType;