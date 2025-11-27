import { useEffect } from "react";

export default function MainNavBar() {
    useEffect(() => {
            const handleScroll = () => {                
                if (window.scrollY > 50) {
                    // إزاحة الأزرار للأعلى عند التمرير
                    document.getElementById('MainNavBar').style.top = 0;
                    document.getElementById('MainNavBar').style.backgroundColor = "white";
                }
                else{
                    document.getElementById('MainNavBar').style.top = "1.5em";
                    document.getElementById('MainNavBar').style.backgroundColor = "#8aaaca";

                }
            };
    
            window.addEventListener('scroll', handleScroll);
    
            // تنظيف الحدث عند تفكيك المكون
            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }, []);
  return (
  <div id="MainNavBar" className="container-fluid p-0">
    <nav className="navbar navbar-expand-lg navbar-light py-0 px-4 px-lg-5 fs-3 ">
      <a href="" className="navbar-brand p-0">
        <h3 className="m-0 ms-4">
          <img src="images/logo.png" alt="" width="50" className="px-1 py-2 "/> 
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
    </nav>

    
  </div>
  )
}
