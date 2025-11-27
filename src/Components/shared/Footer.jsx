import React from 'react'

export default function Footer() {
  return (
     <footer id="footer" className="container-fluid text-white-50 ">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-section">
                    <h4>عن المنصة</h4>
                    <p>منصة بنائك هي المنصة الأولى للخدمات الهندسية والعمارية في المنطقة</p>
                </div>

                <div class="footer-section">
                    <h4>روابط سريعة</h4>
                    <ul>
                        <li><a href="#home">الرئيسية</a></li>
                        <li><a href="#projects">المشاريع</a></li>
                        <li><a href="#services">الخدمات</a></li>
                        <li><a href="#contact">اتصل بنا</a></li>
                    </ul>
                </div>

                <div class="footer-section">
                    <h4>الخدمات</h4>
                    <ul>
                        <li><a href="#">التصميم المعماري</a></li>
                        <li><a href="#">الإشراف الهندسي</a></li>
                        <li><a href="#">الاستشارات</a></li>
                        <li><a href="#">دراسات الجدوى</a></li>
                    </ul>
                </div>

                <div class="footer-section">
                    <h4>تواصل معنا</h4>
                    <p>
                        <i className="fa fa-map-marker ms-3"></i> 
                        <a href=""> العنوان</a>
                    </p>

                    <p>
                        <i class="fa fa-phone"></i>
                        <a href="tel:+963-xx-xxxx-xxxx"> +963-xx-xxxx-xxxx</a>
                    </p>
                    <p>
                        <i class="fa fa-envelope"></i>
                        <a href="mailto:info@bs.com"> info@bs.com </a>
                    </p>
                    <div class="social-links">
                        <a href="#"><i class="fa fa-facebook"></i></a>
                        <a href="#"><i class="fa fa-whatsapp"></i></a>
                        <a href="#"><i class="fa fa-instagram"></i></a>
                        <a href="#"><i class="fa fa-linkedin"></i></a>
                    </div>
                </div>
            </div>

            <div class="footer-bottom">
                <p>&copy; 2025 منصة بنائك. جميع الحقوق محفوظة.</p>
            </div>
        </div>
    </footer>

  )
}
