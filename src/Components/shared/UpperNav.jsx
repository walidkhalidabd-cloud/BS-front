export default function UpperNav() {
  return (
    <div id="upper-nav" className="container-fluid bg-primary d-none py-2 d-lg-block">
        <div className="row gx-0">
             <div className="col-lg-4 text-center text-lg-end">
            <div className="d-inline-flex align-items-center h45" >
              <a href="#">
                <small className="me-3 text-light">
                    اشترك
                  <i className="fa fa-user me-2"></i> 
                </small>
              </a>
              <a href="#">
                <small className="me-3 text-light">
                    دخول
                  <i className="fa fa-sign-in me-2"></i>
                </small>
              </a>             
            </div>
          </div>
          <div className="col-lg-8 text-center text-lg-start mb-2 mb-lg-0 ">
            <div className="d-inline-flex align-items-center h45" >
              <a
                className="btn btn-outline-light rounded-circle me-2"
                href=""
              > 
                <i className="fa fa-whatsapp"></i>
              </a>
              <a
                className="btn  btn-outline-light btn-sm-square rounded-circle me-2"
                href=""
              >
                <i className="fa fa-facebook-f "></i>
              </a>              
              <a
                className="btn btn-outline-light btn-sm-square rounded-circle me-2"
                href=""
              >
                <i className="fa fa-instagram "></i>
              </a>
              <a
                className="btn  btn-outline-light btn-sm-square rounded-circle"
                href=""
              >
                <i className="fa fa-youtube"></i>
              </a>
            </div>
          </div>
         
        </div>
      </div>
  )
}
