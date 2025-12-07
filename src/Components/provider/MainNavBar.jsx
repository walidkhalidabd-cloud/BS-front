import { Link, NavLink } from "react-router-dom";

export default function MainNavBar() {
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
            <div className="d-flex left-nav">
              <a href="#" className="nav-item nav-link">
                اشترك
              </a>

              <Link to="/provider" className="me-3 nav-item nav-link">
                دخول
                <i className="fa fa-sign-in"></i>
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
