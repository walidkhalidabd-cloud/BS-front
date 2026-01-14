import "./NotificationBox.css";
import { notifications as apiNotifications } from "../../services/api";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Loading from "./Loading";

export default function NotificationBox({ setNotificationOpen,setUnreadNotificationsCount }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  const markAsRead = async () => {
    const { success, msg } = await apiNotifications.markAsRead();
    if (success) {
      const readNotifications = notifications.map((n) => {
        if (!n.read) {
          n.date = new Date();
          n.read = true;
        }
        return n;
      });
      console.log("read");
      setNotifications(readNotifications);
      setUnreadNotificationsCount(0);

    } else toast.error(msg);
  };

  useEffect(() => {
    const unreadNotifications = async () => {
      setLoading(true);
      const { success, data, msg } = await apiNotifications.list();
      // console.log(data);
      if (success) setNotifications(data);
      else toast.error(msg);
      setLoading(false);
    };

    unreadNotifications();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div
          className="position-fixed top-0 start-0 w-100 h-100"
          style={{ backgroundColor: "rgba(100,100,100,0.2)", zIndex: 1050 }}
          onClick={() => {
            setNotificationOpen(false);
            markAsRead();
          }}
        >
          {/* Modal dialog */}
          <div
            className="modal-dialog modal-lg"
            onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
          >
            <div className="modal-content">
              <button
                type="button"
                className="btn close bg-warning"
                onClick={() => {
                  setNotificationOpen(false);
                  markAsRead();
                }}
              >
                <i className="fa fa-close"></i>
              </button>
              <div className="modal-body p-0">
                <table className="table mb-0 table-concise table-center">
                  <thead className="table-light ">
                    <tr className=" fw-normal">
                      <th className=" fw-light text-warning ">الرسالة</th>
                      <th className=" fw-light text-warning ">التاريخ</th>
                      <th className=" fw-light text-warning ">الحالة</th>
                    </tr>
                  </thead>
                  <tbody>
                    {notifications.map((n) => (
                      <tr
                        key={n.id}                        
                      >
                        <td>{n.message}</td>
                        <td>{new Date(n.date).toLocaleDateString("ar-EG")}</td>
                        {/* <td>{n.date}</td> */}
                        <td>
                          {n.read ? (
                            <span className="badge bg-primary">مقروء</span>
                          ) : (
                            <span className="badge bg-warning msg-dark">
                              غير مقروء
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
