import ManageMain from '../../../components/Admin/Manage/ManageMain';
import { accountStatuses } from '../../../services/api';

export default function AccountStatus() {
  return (
    <ManageMain
      api={accountStatuses}
      fields={[
        { name: "name", label: "اسم نوع جهات الاتصال" },
      ]}
    />
  );
}

