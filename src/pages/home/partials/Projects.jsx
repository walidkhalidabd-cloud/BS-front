import { useEffect, useState } from "react";
import { customer as apiCustomer } from "../../../services/api";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function Projects() {
  // console.log("out" , projectStatus);

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  function handleOffers(){
    
  }
  useEffect(() => {
    async function load() {
      setLoading(true);
      const { success, data, msg } = await apiCustomer.getCustomerProjects();
      if (success) {
        setProjects(data);
      } else toast.error(msg);
      setLoading(false);
    }
    load();
  }, []);
  // ['start_date' , 'end_date' , 'duration' , 'area' , 'location' ,
  //     'description' , 'building_no'  ,'budget' ,  'note' , 'status' , 'project_type_id', 'customer_id' , 'performed_by' ,'province_id']
  return (
    <div className="h-50vh mt-7 container">
      <h3 className="text-secondary text-center">المشاريع</h3>
      {loading && (
        <div
          className="mt-7"
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(255,255,255,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          جارٍ التحميل...
        </div>
      )}

      <table className="table">
        <thead>
          <tr>
            <th># </th>
            <th>تاريخ البدء</th>
            <th>المدة</th>
            <th>المساحة</th>
            <th>الموقع</th>
            <th>المنجز</th>
            <th style={{ width: 180 }}>إجراءات</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.start_date}</td>
              <td>{s.duration}</td>
              <td>{s.area}</td>
              <td>{s.location_details}</td>
              <td>الإنجاز</td>
              <td>
                {s.status == "new" ? (
                  <button
                    // to={`/client/project-details/${s.id}`}
                    onClick={handleOffers}
                    className="btn btn-warning btn-sm"
                  >
                    العروض
                  </button>
                ) : (
                  <Link
                    to={`/client/project-details/${s.id}`}
                    className="btn btn-warning btn-sm"
                  >
                    المراحل
                  </Link>
                )}
              </td>
            </tr>
          ))}
          {projects.length === 0 && !loading && (
            <tr>
              <td colSpan={7} className="text-center">
                لا توجد بيانات
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
