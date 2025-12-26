
import { useState } from "react";

const StatCard = ({ label, value,  color }) => (
  <div className={`provider-card px-4 text-${color} `}>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div className="label">{label}</div>
      <div className="provider-icon">
      </div>
    </div>
    <div className="value" style={{ marginTop: 8 }}>
      {value}
    </div>
  </div>
);

export default function HomeMain() {
  const newProjects = 1 ,activeProjects = 2, finishedProjects = 6, evaluation = '4.5'  ;
  const [user, setUser] = useState({
  name: "الثقة",
  });

  return (
    <section className="p-5 mt-5 h-50vh">
      <p className="mb-2  fs-1">مرحباً {user?.name} </p>

      <i className="fa-solid fa-basket-shopping"></i>
      <div className="provider-cards">
        <StatCard
          label="مشاريع جديدة"
          value={activeProjects}
          color="danger"
        />
        <StatCard
          label="مشاريع نشطة"
          value={activeProjects}
          color="success"
        />
        <StatCard
          label="مشاريع منتهية"
          value={finishedProjects}
          color="primary"
        />
        <StatCard
          label="التقييم"
          value={evaluation}
          color="warning"
        />
      </div>
    </section>
  );
}
