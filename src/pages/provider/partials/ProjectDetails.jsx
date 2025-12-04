import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { projects as apiProject } from "../../../services/apiReq";
export default function ProjectDetails() {
  const { project_id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  useEffect(() => {
    setLoading(true);
    const load = async () => {
      try {
        const data = await apiProject.show(project_id);
        setProject(data);
        console.log(data);
      } catch (err) {
        setErr(err.message || "خطأ في جلب البيانات");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);
  return (
    <div className="container">
      {loading && (
        <div
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
      
      {project && (
        <div className="project-details mt-7 p-3">                    
          <div className="project-field"><span className="project-label">رقم المشروع</span> {project.id}</div>
          <div className="project-field"><span className="project-label">تاريخ البدء</span> {project.start_date}</div>
          <div className="project-field"><span className="project-label">المدة بالأشهر</span> {project.duration}</div>
          <div className="project-field"><span className="project-label">المساحة (كم) </span> {project.area}</div>
          <div className="project-field"><span className="project-label">تفاصيل الموقع</span> {project.location_details}</div>
          <div className="project-field"><span className="project-label">رقم البناء</span> {project.building_no}</div>
          <div className="project-field"><span className="project-label">نوع المشروع</span> {project.project_type_id}</div>
          <div className="project-field"><span className="project-label">ملاحظات</span> {project.note}</div>
          <div className="text-center">
          <Link className="btn btn-secondary fs-4" to="add-offer">تقديم عرض</Link>
          </div>
        </div>
      )}
    </div>
  );
}
