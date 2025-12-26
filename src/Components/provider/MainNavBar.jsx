import { Link, NavLink,useNavigate } from "react-router-dom";
import { auth } from "../../services/api";

export default function MainNavBar() {
  const user = auth.currentUser();
  const navigate = useNavigate();

  const logout = () => {
    auth.logout();
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("type");
    navigate("/");
  };
  return (
    <>
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
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav ms-auto py-0 fs-4">
              <NavLink to="/provider" className="nav-item nav-link" end>
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
              {user ? (
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
                      <Link className="dropdown-item" to="#">
                        الملف الشخصي
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item " to="/admin">
                        إدارة الموقع
                      </Link>
                    </li>

                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <button className="nav-link mx-auto" onClick={logout}>
                        تسجيل خروج
                      </button>
                    </li>
                  </ul>
                </li>
              ) : (
                <li className="nav-item d-flex ms-7">
                  <>
                    <Link to="/login" className="nav-link ms-3 ">
                      تسجيل دخول
                    </Link>
                    <Link to="/register" className="nav-link">
                      إنشاء حساب
                    </Link>
                  </>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
}
