import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function MainNavBar() {
  return (
    <div id="MainNavBar" className="container-fluid p-0 top-0 fs-4">
      <nav className="navbar navbar-expand-lg navbar-light py-0 px-4 px-lg-5  ">
        <a href="" className="navbar-brand p-0">
          <h3 className="m-0 ms-4">
            <img
              src="images/logo.png"
              alt=""
              width="50"
              className="px-1 py-2 "
            />
          </h3>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="fa fa-bars"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ms-auto py-0">
            <a href="index.html" className="nav-item nav-link active">
              الرئيسية
            </a>
            <a href="about.html" className="nav-item nav-link">
              حول المنصة
            </a>
            <a href="services.html" className="nav-item nav-link">
              الخدمات
            </a>

            <a href="contact.html" className="nav-item nav-link">
              اتصل بنا
            </a>
          </div>
        </div>
        <a href="#">
          <small className="me-3 text-light">
            اشترك
            <i className="fa fa-user me-2"></i>
          </small>
        </a>
        <Link to="/provider">
          <small className="me-3 text-light">
            دخول
            <i className="fa fa-sign-in me-2"></i>
          </small>
        </Link>
      </nav>
    </div>
  );
}
