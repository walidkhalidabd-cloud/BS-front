import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { projects as apiProject } from "../../../services/api";
import { toast } from "react-toastify";
export default function ProjectDetails() {
  const { project_id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Go back one step in the history stack
  };
  useEffect(() => {
    setLoading(true);
    const load = async () => {
      const { success, data, msg } = await apiProject.show(project_id);
      if (success) {
        setProject(data);
        // console.log(data);
      } else toast.error(msg);
      setLoading(false);
    };
    load();
  }, []);
  return (
    <div className="container min-vh-100 pt-5">
      <h3 className="mt-5 fs-4 my-0 text-warning text-center "> تفاصيل المشروع</h3>

      <div className="row">
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
          <div className="project-details col-md-6 mx-auto">
            <div className="project-field">
              <span className="project-label">رقم المشروع</span> {project.id}
            </div>
            <div className="project-field">
              <span className="project-label">تاريخ البدء</span>{" "}
              {project.start_date}
            </div>
            <div className="project-field">
              <span className="project-label">المدة بالأشهر</span>{" "}
              {project.duration}
            </div>
            <div className="project-field">
              <span className="project-label">المساحة (كم) </span>{" "}
              {project.area}
            </div>
            <div className="project-field">
              <span className="project-label">تفاصيل الموقع</span>{" "}
              {project.location_details}
            </div>
            <div className="project-field">
              <span className="project-label">رقم البناء</span>{" "}
              {project.building_no}
            </div>
            <div className="project-field">
              <span className="project-label">نوع المشروع</span>{" "}
              {project.project_type?.name}
            </div>
            <div className="project-field">
              <span className="project-label">المحافظة</span>{" "}
              {project.province?.name}
            </div>
            <div className="project-field">
              <span className="project-label">ملاحظات</span> {project.note}
            </div>
            {project.documets?.map((document) => (
              <div>                
                <a href={document.url} target="_blank">
                  view
                </a>
              </div>
            ))}

            <div className="mx-4 mt-4 px-2 ">
              <p className="py-0">المستندات</p>
              {/* optional chaining */}
              <div className="bg-white px-1">
                {project.documents.length ? (
                  project.documents?.map((document) => (
                    <div key={document.id} className="d-flex gap-3">
                      <div>{document.description}</div>
                      <a
                        href={document.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="معاينة"
                      >
                        <i className="fa fa-eye text-warning"></i>
                      </a>
                      <a href={document.path} download>
                        <i className="fa fa-download" title="تنزيل"></i>
                      </a>
                    </div>
                  ))
                ) : (
                  <div> لا يوجد مستندات</div>
                )}
              </div>

              <div className="text-center my-2">
                <Link
                  className="btn btn-sm btn-secondary fw-bold fs-6"
                  to={`/client/add-offer/${project_id}`}
                >
                  تقديم عرض
                </Link>

                <button
                  className="btn btn-primary me-2 fw-bold fs-6"
                  onClick={handleGoBack}
                >
                  عودة
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
