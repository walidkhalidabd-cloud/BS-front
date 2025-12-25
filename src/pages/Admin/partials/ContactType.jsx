import ManageMain from '../../../components/Admin/Manage/ManageMain';
import { contactTypes } from '../../../services/api';

export default function ContactType() {
  return (
    <ManageMain
      api={contactTypes}
      fields={[
        { name: "name", label: "اسم نوع جهات الاتصال" },
      ]}
    />
  );
}

