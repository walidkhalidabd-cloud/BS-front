import { useEffect, useState } from "react";
import { admin as apiAdmin } from "../../../services/api";
import { useParams } from "react-router-dom";
import Loading from "../../../Components/shared/Loading";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Clients() {
  const { status } = useParams();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [clients, setClients] = useState([]);
  const navigate = useNavigate();

  function getDetails(client) {
    // navigate to admin client detail page and pass client object in state
    navigate("/admin/client-detail", { state: { client } });
  }
  async function handleAccept(clientId) {
    setSaving(true);
    const { success, msg } = await apiAdmin.acceptClient(clientId);
    if (success) {
      setClients((prev) => prev.filter((s) => s.id !== clientId));
      toast.success("تم قبول العميل");
    } else toast.error(msg);

    setSaving(false);
  }

  useEffect(() => {
    async function loadClients(status) {
      setLoading(true);
      const { success, data, msg } = await apiAdmin.listClients(status);
      if (success) setClients(Array.isArray(data) ? data : []);
      else toast.error(msg);
      setLoading(false);
    }

    loadClients(status);
  }, []);

  return (
    <section>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h4 style={{ margin: 0 }}> العملاء قيد الانتظار</h4>
      </div>

      {loading && <Loading />}

      <div style={{ marginTop: 12 }}>
        <div
          style={{
            background: "#fff",
            borderRadius: 8,
            overflow: "auto",
            position: "relative",
          }}
        >
          {(loading || saving) && <Loading />}
          <table className="table">
            <thead>
              <tr>
                <th>الاسم</th>
                <th>عدد سنوات الخبرة</th>
                <th style={{ width: 180 }}>إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((s, i) => (
                <tr key={i}>
                  <td>{s.name}</td>
                  <td>{s.experience}</td>
                  <td>
                    <button
                      onClick={() => handleAccept(s.id)}
                      className={`btn btn-outline-warning border border-warning`}
                    >
                      {saving ? "جاري القبول" : "قبول"}
                    </button>
                    <button
                      className="btn btn-outline-primary border border-primary me-2"
                      onClick={() => getDetails(s)}
                    >
                      تفاصيل
                    </button>
                  </td>
                </tr>
              ))}
              {clients.length === 0 && !loading && (
                <tr>
                  <td colSpan={2} className="empty-state">
                    لا توجد بيانات
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
