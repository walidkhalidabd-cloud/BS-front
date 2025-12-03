import { useEffect, useState } from "react";
import { projects as apiProjects } from "../../../services/api";
import { Link, useParams } from "react-router-dom";

export default function Projects() {
  const { status } = useParams();
  console.log(status);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function load({ state }) {
      try {
        const projects = await apiProjects.list();
        console.log(projects);
        setProjects(projects);
      } catch (err) {
        console.error(err);
        setError(err.message || "خطأ في تحميل البيانات");
      } finally {
        setLoading(false);
      }
    }
    load(status);
  }, []);
  // ['start_date' , 'end_date' , 'duration' , 'area' , 'location' ,
  //     'description' , 'building_no'  ,'budget' ,  'note' , 'status' , 'project_type_id', 'customer_id' , 'performed_by']
  return (
    <div className="h-50vh mt-7 container">
      <h3 className="text-secondary text-center">المشاريع</h3>
      <table className="table">
        <thead>
          <tr>
            <th>تاريخ البدء</th>
            <th>المدة</th>
            <th>المساحة</th>
            <th>الموقع</th>
            <th style={{ width: 180 }}>إجراءات</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((s) => (
            <tr key={s.id}>
              <td>{s.start_date}</td>
              <td>{s.duration}</td>
              <td>{s.area}</td>
              <td>{s.location_details}</td>
              <td>
                <Link to="#" className="btn btn-warning btn-sm">
                  تفاصيل
                </Link>
              </td>
            </tr>
          ))}
          {projects.length === 0 && !loading && (
            <tr>
              <td colSpan={5}>لا توجد بيانات</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
