import { NavLink } from "react-router-dom";

export default function MainNavBar() {
  return (
    <>
      <div id="MainNavBar" className="container-fluid p-0 top-0">
        <nav className="navbar navbar-expand-lg navbar-light py-0 px-4 px-lg-5 fs-3 ">
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
            <div className="navbar-nav ms-auto py-0 fs-4">
              <NavLink to="/provider" className="nav-item nav-link active">
                الرئيسية
              </NavLink>

              <NavLink to="projects/contracted" className="nav-item nav-link">
                المشاريع النشطة
              </NavLink>

              <NavLink to="projects/finished" className="nav-item nav-link">
                المشاريع المنتهية
              </NavLink>
              <NavLink href="projects/new" className="nav-item nav-link">
                الطلبات الجديدة
              </NavLink>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
