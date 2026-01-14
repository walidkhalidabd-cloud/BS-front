import { useEffect, useState } from "react";
import { roles as apiRoles } from "../../services/api";
import { toast } from "react-toastify";
export default function Services() {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const load = async () => {
      const { success, data, msg } = await apiRoles.list();
      if (success) setRoles(data);
      else toast.error(msg);
    };
    setLoading(false);
    load();
  }, []);
  return (
    <div id="services" className="container-fluid mt-200 mb-100 main-container">
      <div className="text-center">
        <h2 className="mb-5 text-secondary">الخدمات الرئيسية </h2>
        <div className="d-flex flex-wrap justify-content-evenly gap-5">
          {roles.map((role, index) => (
              <div key={index}
                className="card text-center"
                style={{ width: "400px", margin: "auto" }}
              >
                <h3>{role.name} </h3>
              </div>
          ))}
        </div>
      </div>
    </div>
  );
}
