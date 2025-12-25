import ManageMain from '../../../components/Admin/Manage/ManageMain';
import { documentTypes } from '../../../services/api';

export default function DocumentType() {
  return (
    <ManageMain
      api={documentTypes}
      fields={[
        { name: "name", label: "اسم نوع المستند" },
      ]}
    />
  );
}
