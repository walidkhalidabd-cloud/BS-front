import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ClientDetails from "../../../Components/ClientDetails";
import { Link } from "react-router-dom";

export default function ClientDetail() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const client = state?.client;

  if (!client) {
    return (
      <div className="container pt-4">
        <h4>تفاصيل العميل</h4>
        <div>لا توجد بيانات العميل. ربما فتحت الصفحة مباشرة بدون تمرير بيانات.</div>
        <div className="mt-3">
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>
            عودة
          </button>
          <Link className="btn btn-link" to="/admin/clients/pending">
            قائمة العملاء
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container pt-4">
      <h4>تفاصيل العميل</h4>
      <ClientDetails client={client} />
      <div className="mt-3">
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          عودة
        </button>
      </div>
    </div>
  );
}
