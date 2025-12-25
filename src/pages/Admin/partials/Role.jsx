import ManageMain from '../../../components/Admin/Manage/ManageMain';
import { roles } from '../../../services/api';

export default function Role() {
  return (
    <ManageMain
      api={roles}
      fields={[
        { name: "name", label: "اسم نوع جهات الاتصال" },
      ]}
    />
  );
}

