import React, { useEffect, useState } from "react";
import Loading from "../../../components/Shared/Loading";
import { toast } from "react-toastify";
import admin from "../../../services/api/admin";

const StatCard = ({ label, value, icon, color }) => (
  <div className={`admin-card text-${color} `}>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div className="label">{label}</div>
      <div className="admin-icon">
        <i className={`fa fa-${icon}`}></i>
      </div>
    </div>
    <div className="value fs-1" style={{ marginTop: 8  }}>
      {value}
    </div>
  </div>
);

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [totals, setTotals] = useState({
    categories: 0,
    tourists: 0,
    providers: 0,
    bookings: 0,
  });
  useEffect(() => {
    async function getTotals() {
      setLoading(true);
      const { success, data, msg } = await admin.totals();
      if (success) setTotals(data);
      else toast.error(msg);
      setLoading(false);
    }
    getTotals();
  }, []);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <section>
          <i className="fa-solid fa-basket-shopping"></i>
          <div className="admin-cards">
            <StatCard
              label="عدد المشاريع"
              value={totals.projects}
              icon="gratipay"
              color="success"
            />
            <StatCard
              label="عدد الزبائن"
              value={totals.customer}
              icon="person"
              color="danger"
            />
            <StatCard
              label="مقدمو الخدمة"
              value={totals.clients}
              icon="users"
              color="warning"
            />            
          </div>
        </section>
      )}
    </>
  );
};

export default Home;
