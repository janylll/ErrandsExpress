import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/ErrandsLogo.png';
import './layout.css';

function Layout() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const [posts, setPosts] = useState([]);
  const [userProfile, setUserProfile] = useState({
    name: 'E',
    image: null
  });
  
  const [modalOpen, setModalOpen] = useState(false);
  const toggleModal = () => setModalOpen(!modalOpen);
  

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
            <div className="profile-info" onClick={toggleModal}>
              <div className="profile-circle">
                {userProfile.image ? (
                  <img src={userProfile.image} alt="Profile" className="profile-img" />
                ) : (
                  userProfile.name.charAt(0)
                )}
              </div>
              <span className="profile-name">{userProfile.name}</span>
            </div>

            <button className="hamburger-menu-btn" onClick={toggleDropdown}>
              ☰
            </button>

            {dropdownOpen && (
              <div className="dropdown-menu">
                <ul>
                  <li onClick={() => navigate('/dashboard')}>Dashboard</li> 
                  <li onClick={handleLogout}>Log Out</li>
                </ul>
              </div>
            )}
          </div>
        </header>

        <main className="page-content">
        <Outlet context={{ posts, setPosts, userProfile }} />
        </main>
                {modalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Edit Profile</h2>
              <label>
                Name:
                <input
                  type="text"
                  value={userProfile.name}
                  onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
                />
              </label>
              <label>
                Profile Picture:
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setUserProfile({ ...userProfile, image: reader.result });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </label>
              <div className="modal-buttons">
                <button onClick={toggleModal}>Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Layout;
