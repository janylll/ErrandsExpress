import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/ErrandsLogo.png';
import '../dashboard/layout.css';

function Layout2() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = () => {
    navigate('/AdminLogin');
  };

  return (
    <div className="layout-container">
      <aside className="sidebar">
        <nav className="Sidebarnav-links">
          <NavLink to="manageaccount" className={({ isActive }) => isActive ? 'active-link' : ''}>Manage Account</NavLink>
          <NavLink to="manageaccount" className={({ isActive }) => isActive ? 'active-link' : ''}>Reports</NavLink>
          <NavLink to="manageaccount" className={({ isActive }) => isActive ? 'active-link' : ''}>Transactions</NavLink>
        </nav>
      </aside>

      <div className="content-area">
        <header className="main-header">
          <div className="header-left" onClick={() => navigate('/admindashboard')} style={{cursor: 'pointer'}}>
            <img src={logo} alt="Errands Logo" className="sidebar-logo" />
            <h1 className="logo-title" onClick={() => navigate('/admindashboard')} style={{cursor: 'pointer'}}>Errands Express</h1>
          </div>

          <div className="header-right">
            <button className="hamburger-menu-btn" onClick={toggleDropdown}>
              ☰
            </button>

            {dropdownOpen && (
              <div className="dropdown-menu">
                <ul>
                <li onClick={() => navigate('/adminDashboard')}>Dashboard</li> 
                <li>Settings</li>
                  <li onClick={handleLogout}>Log Out</li>
                </ul>
              </div>
            )}
          </div>
        </header>
      </div>
    </div>
  );
}

export default Layout2;
