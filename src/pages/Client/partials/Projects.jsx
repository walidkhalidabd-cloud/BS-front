import { useEffect, useState } from "react";
import { client as apiClient, client } from "../../../services/api";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function Projects() {
  const { projectStatus } = useParams();
  // console.log(projectStatus);
  const statusLabel =
    projectStatus === "new"
      ? "الجديدة"
      : projectStatus === "active"
      ? "النشطة"
      : "المكتملة";
  const navigator = useNavigate();

  const [projects, setProjects] = useState([]);
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const handeDetails = (id) => {
    if (!active)
      toast.warning("الحساب غير مفعل لا يمكن الإطلاع على تفاصيل العروض");
    else navigator(`/client/project-details/${id}`);
  };

  useEffect(() => {
    async function load(projectStatus) {
      setLoading(true);
      const apiFunc =
        projectStatus == "new"
          ? apiClient.getNewProjects
          : apiClient.getProjects;
      console.log(apiFunc);
      const { success, data, msg } = await apiFunc(projectStatus);
      if (success) {
        setProjects(data);
      } else toast.error(msg);
      setLoading(false);
    }
    load(projectStatus);
  }, [projectStatus]);

  useEffect(() => {
    const isActive = async () => {
      const { success, data, msg } = await client.isActive();
      console.log(data.is_active);
      if (success) setActive(data.is_active);
      else toast.error(msg);
    };
    isActive();
  }, []);
  // ['start_date' , 'end_date' , 'duration' , 'area' , 'location' ,
  //     'description' , 'building_no'  ,'budget' ,  'note' , 'status' , 'project_type_id', 'customer_id' , 'performed_by' ,'province_id']
  return (
    <div className="h-50vh mt-7 container">
      <h3 className="text-secondary text-center">المشاريع {statusLabel}</h3>
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
              <td>
                <button
                  onClick={() => handeDetails(s.id)}
                  className="btn btn-warning btn-sm"
                >
                  تفاصيل
                </button>
              </td>
            </tr>
          ))}
          {projects.length === 0 && !loading && (
            <tr>
              <td colSpan={6} className="text-center">
                لا توجد بيانات
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
