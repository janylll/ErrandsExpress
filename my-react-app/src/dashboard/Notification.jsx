import logo from '../assets/ErrandsLogo.png';

function Notification() {
  return (
    <div className='Pages'>
      <header className='dashboard-header'>
        <img src={logo} alt="Errands Express Logo" className="header-logo" />
        <>Notification</>
      </header>
    </div>
  );
}

export default Notification;