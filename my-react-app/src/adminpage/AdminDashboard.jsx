import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import '../dashboard/layout.css';
import logo from '../assets/ErrandsLogo.png';
function admindashboard() {
  return (
    <div className='Pages'>
      <header className='dashboard-header'>
        <img src={logo} alt="Errands Express Logo" className="header-logo" />
        <>ManageAccount</>
      </header>
    </div>
  );
}

export default admindashboard;