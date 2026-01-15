import { useEffect, useState } from "react";
import { auth, client } from "../../../services/api";
import { toast } from "react-toastify";

const StatCard = ({ label, value, color }) => (
  <div className={`client-card px-4 text-${color} `}>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div className="label">{label}</div>
      <div className="client-icon"></div>
    </div>
    <div className="value" style={{ marginTop: 8 }}>
      {value}
    </div>
  </div>
);

export default function HomeMain() {
  const [totals, setTotals] = useState({
    activeProject: null,
    completedProject: null,
    rate: null,
  });

  const user = auth.currentUser();
  console.log(user);
  useEffect(() => {
    
    const load = async () => {
      const { success, data, msg } = await client.getTotals();
      if (success) setTotals(data);
      else toast.error(msg);
    };
    load();
  }, []);

  return (
    <section className="p-5 mt-5 h-50vh">
      <p className="mb-2  fs-1">مرحباً {user}  </p>

      <i className="fa-solid fa-basket-shopping"></i>
      <div className="client-cards">
        <StatCard
          label="مشاريع نشطة"
          value={totals.activeProject}
          color="success"
        />
        <StatCard
          label="مشاريع منتهية"
          value={totals.completedProject}
          color="primary"
        />
        <StatCard label="التقييم" value={totals.rate} color="warning" />
      </div>
    </section>
  );
}
