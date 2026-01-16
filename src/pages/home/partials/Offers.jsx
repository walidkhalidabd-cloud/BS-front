import { useEffect, useState } from "react";
import { customer as apiCustomer } from "../../../services/api";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function Offers() {
  const { projectId } = useParams();

  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleOffer(offerId){
      const { success,  msg } = await apiCustomer.acceptOffer(projectId , offerId);
      if (success) 
        toast.success(msg);
      else
        toast.error();
    
  }
  useEffect(() => {
    async function load(projectId) {
      setLoading(true);
      const { success, data, msg } = await apiCustomer.getOffers(projectId);
      if (success) {
        setOffers(data);
      } else toast.error(msg);
      setLoading(false);
    }
    load(projectId);
  }, []);
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
            <th> الكلفة</th>
            <th>المدة</th>
            <th>تفاصيل</th>
            <th>ملفات</th>
            <th style={{ width: 180 }}>إجراءات</th>
          </tr>
        </thead>
        <tbody>
          {offers.map((s) => (
            <tr key={s.id}> 
              <td>{s.id}</td>
              <td>{s.cost}</td>
              <td>{s.duration}</td>
              <td>{s.details}</td>
              <td>{s.documents.map((d) => (<a href={d.path} target="_blank"><i className="fa fa-eye"></i> {d.description}</a> ))}</td>
              <td>
                  <button
                    onClick={() => handleOffer(s.id)}
                    className="btn btn-warning btn-sm"
                  >
                    قبول
                  </button>
               
              </td>
            </tr>
          ))}
          {offers.length === 0 && !loading && (
            <tr>
              <td colSpan={5} className="text-center">
                لا توجد بيانات
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
