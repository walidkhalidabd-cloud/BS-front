import sendRequest from "./apiReq";
const notifications ={
list: () => sendRequest({verb: 'get' , url: '/notifications/'} ),
unreadCount: () => sendRequest({verb: 'get' , url: '/notifications/unread-count'} ),
markAsRead: () => sendRequest({verb: 'patch' , url: '/notifications/mark-as-read'} ),
}
export default notifications;21