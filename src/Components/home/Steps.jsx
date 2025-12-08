import "./Steps.css";
export default function Steps() {
  const steps = [
    { title: "أنشئ حسابك", line1: "سجل حسابك", line2: "كزيون بسهولة" },
    {
      title: "أضف مشروعك",
      line1: "أنشئ مشروعك الجديد ",
      line2: "وأضف التفاصيل والملفات",
    },
    {
      title: " احصل على عروض",
      line1: "استقبل عروض من المتخصصين",
      line2: "واختر الأفضل",
    },
  ];
  return (
    <section className="how-it-works my-5 main-container">
      <div className="container text-center">
        <div className="section-header">
          <h2 className="text-secondary my-3 ">كيف تعمل المنصة؟</h2>
          <p className="fs-3 my-3">ثلاث خطوات بسيطة لتبدأ</p>
        </div>
        <div className="row">
          {steps.map((step, index) => (
            <div className="step col-md-4">
              <div className="step-number ">{index}</div>
              <h3>{step.title}</h3>
              <p>
                {step.line1}
                <br />
                {step.line2}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
