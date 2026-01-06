
import { useEffect, useState } from "react";
import { providers  } from "../../../services/api";
import { useParams } from "react-router-dom";
import Loading from "../../../Components/shared/Loading";

export default function Providers() {
  const {status} = useParams();
  const [loading, setLoading] = useState(false); 
  const [saving, setSaving] = useState(false);
  const [Providers, setProviders] = useState([]);
  

  async function handleToggle( providerId) {
    setSaving(true);
     const {success,  msg} = await providers.changeStatus(providerId , 'active');  
     if(success){
      setProviders((prev) =>
          prev.filter(s => (s.id !== providerId) )
      );
    } else  
        toast.error (msg);

    setSaving(false);
  }

    useEffect( () => {
     async function loadUser(status) {
      setLoading(true);
      const  {  success, data, msg }  = await providers.list(status);      
      if (success)        
          setProviders(Array.isArray(data) ? data : []);
        else 
          toast.error(msg);        
        setLoading(false);
      }    

    loadUser(status);
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
        <h4 style={{ margin: 0 }}>إدارة مزودي الخدمة</h4>
      </div>

      

      <div style={{ marginTop: 12 }}>
        <div
          style={{
            background: "#fff",
            borderRadius: 8,
            overflow: "auto",
            position: "relative",
          }}
        >
          {(loading || saving) &&  <Loading/>}
          <table className="table">
            <thead>
              <tr>
                <th>الاسم</th>
                <th>الوصف</th>                
                <th>الحالة</th>
                <th style={{ width: 180 }}>إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {Providers.map((s) => (
                <tr key={s.id}>
                  <td>{s.name}</td>
                  <td>{s.profile?.experience_start}</td>
                  <td>{s.status == 'active' ? 'فعال' : 'قيد الانتظار' } </td>
                  <td>
                    <button
                      onClick={() => handleToggle(s.id)}
                      className= {`btn ${s.accepted?'btn-danger':'btn-success-light '}  ms-2`}
                    >
                     { saving?  'جاري القبول':'قبول'} 
                    </button>                    
                  </td>
                </tr>
              ))}
              {Providers.length === 0 && !loading && (
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
};