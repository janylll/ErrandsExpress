import logo from '../assets/ErrandsLogo.png';
import {Link} from 'react-router-dom';

function Header2() {
    return (

      <header className="header" >
        <h1 className="logo">Errands Express</h1>
        <nav className="nav"> 
          <ul className="nav-links">
            <li><Link to="/">Homepage</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
            <li><Link to="/AdminLogin">Admin</Link></li>
          </ul>
        </nav>
        <img src={logo} alt="Errands Express Logo" className="header-logo"/>
        <hr />
      </header>
    );
  }
  
  export default Header2;