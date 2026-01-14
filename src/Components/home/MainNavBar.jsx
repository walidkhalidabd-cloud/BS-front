import { useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { auth } from "../../services/api";

export default function MainNavBar() {
  const user = auth.currentUser();
  const userType = auth.currentUserType();
  const navigate = useNavigate();

  const logout = () => {
    auth.logout();
    localStorage.removeItem("name");
    localStorage.removeItem("type");
    navigate("/");
  };
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        // إزاحة الأزرار للأعلى عند التمرير
        document.getElementById("MainNavBar").style.backgroundColor =
          "#1e4770c2";
      } else {
        document.getElementById("MainNavBar").style.backgroundColor = "#1e4770";
      }
    };

    window.addEventListener("scroll", handleScroll);

    // تنظيف الحدث عند تفكيك المكون
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div id="MainNavBar" className="container-fluid p-0  fs-4">
      <nav className="navbar navbar-expand-lg px-lg-5">
        <Link to="/" className="navbar-brand p-0">
          <img src="/images/logo.png" alt="" width="50" className="logo p-1 " />
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
            <NavLink to="/" className="nav-item nav-link" end>
              الرئيسية
            </NavLink>
            <Link to="/guideline" className="nav-item nav-link" end>
              تعليمات إرشادية
            </Link>
            <a
              href="#services"
              className="nav-item nav-link"
              onClick={(e) => {
                e.preventDefault();
                const scrollToServices = () => {
                  document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
                };
                if (window.location.pathname !== "/") {
                  navigate("/");
                  setTimeout(scrollToServices, 150);
                } else {
                  scrollToServices();
                }
              }}
            >
              الخدمات
            </a>

            <NavLink to="/x#" className="nav-item nav-link" >
              اتصل بنا
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
                    {userType == "admin" ? (
                      <Link className="dropdown-item " to="/admin">
                        إدارة الموقع
                      </Link>
                    ) : userType == "client" ? (
                      <Link className="dropdown-item" to="/client">
                        إدارة المشاريع
                      </Link>
                    ) : (
                      <Link className="dropdown-item" to="#">
                        الملف الشخصي
                      </Link>
                    )}
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
  );
}
