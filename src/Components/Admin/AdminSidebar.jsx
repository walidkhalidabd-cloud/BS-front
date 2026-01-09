import "./adminSidebar.css";
import { NavLink } from "react-router-dom";

const AdminSidebar = ({ collapsed = false }) => {
  const items = [
    { label: "لوحة القيادة", icon: "🏠", path: "/admin" },
    { label: "أنواع المشاريع", icon: "🏢", path: "project-types" },
    { label: " أنواع المستندات", icon: "📃", path: "document-types" },
    { label: " الأدوار", icon: "👷‍♂️", path: "roles" },
    { label: "أنواع جهات الاتصال", icon: "📞", path: "contact-types" },
    { label: "عملاء - قيد الانتظار", icon: "👥", path: "clients/pending" },
  ];

  return (
    <aside
      className="admin-sidebar"
      dir="rtl"
      style={{ display: collapsed ? "none" : "block" }}
    >
      <nav>
        <ul>
          {items.map((i, index) => (
            <li key={index}>
              <NavLink to={i.path} className="btn item" end>
                <span style={{ marginLeft: 8 }}>{i.icon}</span>
                <span>{i.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
