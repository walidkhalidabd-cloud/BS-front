import {auth} from '../../services/api'
import { useNavigate } from 'react-router-dom';
import './AdminNavBar.css';

const AdminNavBar = ({onToggleSidebar, sidebarOpen}) => {  
  const navigator = useNavigate();  

  const logoutFn = () => {
    auth.logout();
    localStorage.removeItem("name");
    localStorage.removeItem("type");
    navigator('/');
  }

  return (
    <nav className="admin-header p-2" dir="rtl">      
      <div className="brand">        
        <button className="btn btn-warning " onClick={onToggleSidebar} aria-label="toggle-sidebar" title="إظهار/إخفاء الشريط الجانبي">
        {sidebarOpen?
        (<i className='fa fa-arrow-left'></i>) :
        (<i className='fa fa-arrow-right'></i>)}
        </button>
        
        <h1 className='title m-0'>  إدارة منصة بناءك</h1>
      </div>
      
      <div className="controls d-flex">
      
        <div className="py-2 text-shadow">{auth.currentUser()}</div>        
        <button className="btn text-white mx-5 fs-5 text-shadow" onClick={logoutFn}>تسجيل خروج</button>
        <img src="/logo.png" alt="" width="50"/>

      </div>
    </nav>
  )
}

export default AdminNavBar
