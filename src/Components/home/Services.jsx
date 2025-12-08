import React from "react";
const servicesData = [
  {
    icon: "fa-building",
    title: "المكاتب الهندسية",
    description: "استلام المشاريع بشكل متكامل من التصميم حتى التنفيذ",
  },
  {
    icon: "fa-compass",
    title: "المهندسين",
    description: "يمكنك اختيار المهندس المناسب لإكمال مشروعك",
  },
  {
    icon: "fa-list",
    title: "المقاولين",
    description: "تنفيذ المشروع ورفع تقارير دورية",
  },
];
export default function Services() {
  return (
    <div id="services" className="container-fluid mt-200 mb-100 main-container">
      <div className="container">
        <div className="text-center">
          <h2 className="mb-5 text-secondary">الخدمات الرئيسية </h2>
        </div>
        <div className="row g-5 align-items-center text-center">
          {servicesData.map((service, index) => (
            <div className="col-lg-4" key={index}>
              <div className="card" style={{ maxWidth: "400px" , margin: "auto"}}>
                <span className="icon">
                  <i className={`fa ${service.icon} fa-5x mb-4`}></i>
                </span>
                <h3>{service.title} </h3>
                <p className="mb-0">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
