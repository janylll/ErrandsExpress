import logo from '../assets/ErrandsLogo.png';
import {Link} from 'react-router-dom';

function Header() {
    return (
      <header className="header">
        <h1 className="logo">Errands Express</h1>
        <nav className="nav"> 
          <ul className="nav-links">
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact Us</a></li>
            <li><Link to="/signup" onClick={() => {window.scrollTo({ top: 0, behavior: 'smooth' });
              }}>Sign Up</Link></li>
          </ul>
        </nav>
        <img src={logo} alt="Errands Express Logo" className="header-logo"/>
        <hr />
      </header>
    );
  }
  
  export default Header;
  