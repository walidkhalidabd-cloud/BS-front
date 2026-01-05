import { useEffect, useState } from "react";
import ManageMain from "../../../Components/Admin/Manage/ManageMain";
import { projectTypes, roles as apiRoles } from "../../../services/api";
import { toast } from "react-toastify";

export default function ProjectType() {
  const [roles, setRoles] = useState([]);
  useEffect(() => {
    const load = async () => {
      const { success, msg, data } = await apiRoles.list();
      if (success) {
        setRoles(data);
        console.log(data);
      } else toast.error(msg);
    };
    load();
  }, []);
  return (
    <ManageMain
      api={projectTypes}
      fields={[
        {
          name: "name",
          label: "اسم نوع المشروع",
        },
        {
          name: "roles",
          label: "الدور",
          type: "select",
          options: roles, 
          multiple: true         
        },
      ]}
    />
  );
}
