import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/ErrandsLogo.png';
import './layout.css';

function Layout() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const [posts, setPosts] = useState([]);

  const handleLogout = () => {
    navigate('/signup');
  };

  return (
    <div className="layout-container">
      <aside className="sidebar">
        <nav className="Sidebarnav-links">
          <NavLink to="/dashboard/errands" className={({ isActive }) => isActive ? 'active-link' : ''}>Errands</NavLink>
          <NavLink to="/dashboard/runnermode" className={({ isActive }) => isActive ? 'active-link' : ''}>Runner Mode</NavLink>
          <NavLink to="/dashboard/notification" className={({ isActive }) => isActive ? 'active-link' : ''}>Notification</NavLink>
          <NavLink to="/dashboard/inbox" className={({ isActive }) => isActive ? 'active-link' : ''}>Inbox</NavLink>
        </nav>
      </aside>

      <div className="content-area">
        <header className="main-header">
          <div className="header-left" onClick={() => navigate('/dashboard')} style={{cursor: 'pointer'}}>
            <img src={logo} alt="Errands Logo" className="sidebar-logo" />
            <h1 className="logo-title" onClick={() => navigate('/dashboard')} style={{cursor: 'pointer'}}>Errands Express</h1>
          </div>

          <div className="header-right">
            <div className="profile-circle">E</div>
            <button className="hamburger-menu-btn" onClick={toggleDropdown}>
              ☰
            </button>

            {dropdownOpen && (
              <div className="dropdown-menu">
                <ul>
                  <li onClick={() => navigate('/dashboard')}>Dashboard</li> 
                  <li>Settings</li>
                  <li onClick={handleLogout}>Log Out</li>
                </ul>
              </div>
            )}
          </div>
        </header>

        <main className="page-content">
        <Outlet context={{ posts, setPosts }} />

        </main>
      </div>
    </div>
  );
}

export default Layout;
