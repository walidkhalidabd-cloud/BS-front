import sendRequest from "./apiReq";
const notifications ={
list: () => sendRequest({verb: 'get' , url: '/provider/notifications/'} ),
unreadCount: () => sendRequest({verb: 'get' , url: '/provider/notifications/unread-count'} ),
markAsRead: () => sendRequest({verb: 'patch' , url: '/provider/notifications/mark-as-read'} ),
}
export default notifications;