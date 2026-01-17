import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { customer } from "../../../services/api";
import { toast } from "react-toastify";

export default function Steps() {
  const { projectId, description } = useParams("projectId");
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(function () {
    async function loadSteps() {
      const { success, msg, data } = await customer.getSteps(projectId);
      if (success) setSteps(data);
      else toast.success(msg);
    }
    loadSteps();
  }, []);
  return (
  <div className="h-50vh mt-7 container">
    <h3 className="text-secondary text-center">مراحل المشروع {description}</h3>
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
            <th>الوصف</th>          
            <th>ملاحظة</th>        
            <th>تاريخ</th>        
            <th>ملفات</th>        
          </tr>
        </thead>
        <tbody>
          {steps.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.title}</td>
              <td>{s.Note}</td>
              <td>{s.created_at}</td>
              <td>
                {s.documents.map((f,i)=> <a href={f.path} key={i}> <i className="fa fa-eye"> {f.description} </i> </a>      
                )}
              </td>
            </tr>
          ))}
          {steps.length === 0 && !loading && (
            <tr>
              <td colSpan={7} className="text-center">
                لا توجد بيانات
              </td>
            </tr>
          )}
        </tbody>
      </table>
  </div>
  )
}
