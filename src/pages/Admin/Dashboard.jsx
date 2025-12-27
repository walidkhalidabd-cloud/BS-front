import  { useState } from 'react';
import AdminHeader from '../../Components/Admin/AdminNavBar';
import AdminSidebar from '../../components/admin/AdminSidebar'
import { Outlet } from 'react-router-dom'
import Footer from '../../Components/shared/Footer';

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)  

  return (
    <div style={{minHeight:'100vh',display:'flex',flexDirection:'column'}} dir="rtl">
      <AdminHeader  onToggleSidebar={()=>setSidebarOpen(!sidebarOpen)} sidebarOpen={sidebarOpen}/>

      <div className="admin-layout">
        <AdminSidebar collapsed={!sidebarOpen} />

        <main className="admin-main">
          <Outlet/>
        </main>
      </div>

      <Footer />
    </div>
  )
}
