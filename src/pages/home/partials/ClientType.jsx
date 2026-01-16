import { useEffect, useState } from "react";
import { customer } from "../../../services/api";

import { useParams } from "react-router-dom";
import Loading from "../../../Components/shared/Loading";
import { toast } from "react-toastify";

export default function ClientType() {
  const { role } = useParams();
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState([]);
  const [message, setMessage] = useState([]);

  useEffect(() => {
    async function loadClients(role) {
      setLoading(true);
      console.log("role id", role);
      const { success, data, msg } = await customer.getClients(role);
      if (success) {
        setClients(Array.isArray(data) ? data : []);
        setMessage(msg);
      }
      else toast.error(msg);
      setLoading(false);
    }

    loadClients(role);
  }, []);

  return (
    <section className="general-container">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "100px",
        }}
      >
        <h4 style={{ margin: 0 }}> {message} </h4>
      </div>

      {loading && <Loading />}

      <div className="container" style={{ marginTop: 100 }}>
        <div
          className="row"
          style={{
            textAlign: "center",
          }}
        >
          {loading && <Loading />}

          {clients.map((s, i) => (
              <div className="col-md-3 p-3">
                <div className="rounded-circle bg-white  py-5 shadow shadow-lg" key={i}>
                  <p>{s.name}</p>
                  <p>{s.experience}</p>
                </div>
              </div>
          ))}
        </div>
      </div>
    </section>
  );
}
