import ManageMain from '../../../components/Admin/Manage/ManageMain';
import { projectTypes } from '../../../services/api';

export default function ProjectType() {
  return (
    <ManageMain
      api={projectTypes}
      fields={[
        { name: "name", label: "اسم نوع المشروع" },
      ]}
    />
  );
}

