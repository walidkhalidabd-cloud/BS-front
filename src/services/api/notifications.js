import sendRequest from "./apiReq";
const notifications ={
list: () => sendRequest({verb: 'get' , url: '/client/notifications/'} ),
unreadCount: () => sendRequest({verb: 'get' , url: '/client/notifications/unread-count'} ),
markAsRead: () => sendRequest({verb: 'patch' , url: '/client/notifications/mark-as-read'} ),
}
export default notifications;21