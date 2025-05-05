import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/ErrandsLogo.png';
import './admin.css';

function Layout2() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [reportedUsers, setReportedUsers] = useState([]); // lifted state here
  const navigate = useNavigate();

  const toggleDropdown = () => setDropdownOpen(prev => !prev);

  const handleLogout = () => {
    navigate('/adminlogin');
  };
  const reportUser = (user) => {
    setReportedUsers((prev) => {
      if (prev.some((u) => u.email === user.email)) return prev; // prevent duplicates
      return [...prev, user];
    });
  };

  return (
    <div className="layout-container-admin">
      {/* Sidebar */}
      <aside className="sidebar-admin">
        <nav className="Sidebarnav-links-admin">
          <NavLink to="manage-account" className={({ isActive }) => isActive ? 'active-link' : ''}>
            Manage Account
          </NavLink>
          <NavLink to="transactions" className={({ isActive }) => isActive ? 'active-link' : ''}>
            Transactions
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="content-area-admin">
        <header className="main-header-admin">
          <div className="header-left-admin" onClick={() => navigate('/AdminDashboard')} style={{ cursor: 'pointer' }}>
            <img src={logo} alt="Errands Logo-admin" className="sidebar-logo" />
            <h1 className="logo-title-admin">Errands Express</h1>
          </div>

          <div className="header-right-admin">
            <button className="hamburger-menu-btn-admin" onClick={toggleDropdown}>☰</button>
            {dropdownOpen && (
              <div className="dropdown-menu-admin">
                <ul>
                  <li onClick={() => navigate('/AdminDashboard')}>Dashboard</li>
                  <li>Settings</li>
                  <li onClick={handleLogout}>Log Out</li>
                </ul>
              </div>
            )}
          </div>
        </header>

        {/* Pass reportUser and reportedUsers via Outlet context */}
        <main className="main-content-admin">
          <Outlet context={{ reportUser, reportedUsers }} />
        </main>
      </div>
    </div>
  );
}

export default Layout2;
