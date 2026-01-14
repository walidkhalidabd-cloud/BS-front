import { Link, NavLink, useNavigate } from "react-router-dom";
import { auth } from "../../services/api";
import Loading from "../shared/Loading";
import NotificationBox from "../shared/NotificationBox";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { notifications } from "../../services/api";

export default function clientNavBar() {
  const user = auth.currentUser();
  const navigate = useNavigate();
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const logout = () => {
    auth.logout();
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("type");
    navigate("/");
  };

  useEffect(() => {
    const getUnreadNotifications = async () => {
      setLoading(true);     
      const { success, data, msg } = await notifications.unreadCount();
      console.log(data);
      if (success) 
        setUnreadNotificationsCount(data);
      else toast.error(msg);
      setLoading(false);
    };

    getUnreadNotifications();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div id="MainNavBar" className="container-fluid p-0">
          <nav className="navbar navbar-expand-lg px-lg-5">
            <Link to="/" className="navbar-brand p-0">
              <img
                src="/images/logo.png"
                alt=""
                width="50"
                className="logo p-1 "
              />              
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
            >
              <span className="fa fa-bars"></span>
            </button>
            {notificationOpen && (
              <NotificationBox setNotificationOpen={setNotificationOpen}  setUnreadNotificationsCount={setUnreadNotificationsCount}/>
            )}
            <div className="controls">
              <div
                className="position-relative fs-2 ms-3"
                style={{ cursor: "pointer"  , color: "var(--secondary-dark)"}}
                onClick={() => setNotificationOpen(true)}
              >
                <i className="fa fa-bell-o"></i>
                <span
                  className="position-absolute bg-warning rounded-circle px-1 fw-bold text-dark"
                  style={{
                    fontSize: "10px",
                    bottom: "0px",
                    right: "-9px",
                    zIndex: 9,
                  }}
                >
                  {unreadNotificationsCount}
                </span>
              </div>
            </div>
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <div className="navbar-nav ms-auto py-0 fs-4">
                <NavLink to="/clients" className="nav-item nav-link" end>
                  الرئيسية
                </NavLink>

                <NavLink to="projects/contracted" className="nav-item nav-link">
                  المشاريع النشطة
                </NavLink>

                <NavLink to="projects/finished" className="nav-item nav-link">
                  المشاريع المنتهية
                </NavLink>
                <NavLink to="projects/new" className="nav-item nav-link">
                  المشاريع الجديدة
                </NavLink>               
              </div>

              <ul className="navbar-nav align-items-center fs-5">
                <li className="nav-item dropdown ms-7">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {user}
                  </a>
                  <ul className="dropdown-menu ">
                    <li>
                      <button className="nav-link mx-auto" onClick={logout}>
                        تسجيل خروج
                      </button>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
