import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { admin as apiAdmin } from "../../../services/api";
import ClientDetails from "../../../Components/ClientDetails";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function ClientDetail() {
  const { state } = useLocation();
  console.log("state:", state);
  const navigate = useNavigate();
  const client = state?.client;
  const [saving, setSaving] = useState(false);
  const [accept, setAccept] = useState(false);

  async function handleAccept(clientId) {
    setSaving(true);
    const { success, msg } = await apiAdmin.acceptClient(clientId);
    if (success) {
      toast.success("تم قبول العميل");
      setAccept(true);
    } else toast.error(msg);

    setSaving(false);
  }

  if (!client) {
    return (
      <div className="container pt-4">
        <h4>تفاصيل العميل</h4>
        <div>
          لا توجد بيانات العميل. ربما فتحت الصفحة مباشرة بدون تمرير بيانات.
        </div>
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
      <div className="mt-3 mx-3">
        <button
          disabled={accept}
          onClick={() => handleAccept(client.id)}
          className={`btn btn-outline-warning border border-warning`}
        >
          {saving ? "جاري القبول" : "قبول"}
        </button>
        <button className="btn btn-secondary mx-3" onClick={() => navigate(-1)}>
          عودة
        </button>
      </div>
    </div>
  );
}
