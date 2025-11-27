import './Steps.css'
export default function Steps() {
  return (
    <section class="how-it-works my-5 main-container">
        <div class="container">
            <div class="section-header">
                <h2 className='text-secondary my-3'>كيف تعمل المنصة؟</h2>
                <p className='fs-3 my-3'>ثلاث خطوات بسيطة لتبدأ</p>
            </div>

            <div class="steps">
                <div class="step">
                    <div class="step-number ">1</div>
                    <h3>إنشاء حساب</h3>
                    <p>سجل حسابك كمزود خدمة
                        <br />
                         أو عميل بسهولة</p>
                </div>

                <div class="step">
                    <div class="step-number">2</div>
                    <h3>أضف مشروعك</h3>
                    <p>أنشئ مشروعك الجديد
                        <br />
                         وأضف التفاصيل والملفات</p>
                </div>

                <div class="step">
                    <div class="step-number">3</div>
                    <h3>احصل على عروض</h3>
                    <p>استقبل عروض من المتخصصين
                        <br />
                         واختر الأفضل</p>
                </div>
            </div>
        </div>
    </section>
  )
}
