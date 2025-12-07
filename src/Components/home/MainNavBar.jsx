import { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

export default function MainNavBar() {
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
            <NavLink to="/x#" className="nav-item nav-link">
              حول المنصة
            </NavLink>
            <NavLink to="/x#" className="nav-item nav-link">
              الخدمات
            </NavLink>

            <NavLink to="/x#" className="nav-item nav-link">
              اتصل بنا
            </NavLink>
          </div>
          <div className="d-flex left-nav">
            <a href="#" className="nav-item nav-link">
              اشترك
            </a>

            <Link to="/provider" className="me-3 nav-item nav-link" title="دخول كمزود خدمة">
              دخول
              <i className="fa fa-sign-in"></i>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
