import { useState, useEffect } from 'react';
import '../log-in/auth.css';
import Header2 from '../landing page/Header2.jsx';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import bgImage from '../assets/Background.png'; 

function Admin() {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const adminCredentials = {
    email: "admin@example.com",
    password: "a",
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      formData.email === adminCredentials.email &&
      formData.password === adminCredentials.password
    ) {
      setError('');
      navigate('/adminDashboard'); 
    } else {
      setError('Invalid admin credentials.');
    }
  };

  return (
    <div className='Auth'>
      <Header2 />
      <div
        className="auth-wrapper"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="auth-box">
          <h1 className='title3'>Welcome Admin!</h1>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <span 
                  className="eye-icon" 
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            <div className="input-group remember-me-group">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <label htmlFor="rememberMe">Remember Me</label>
            </div>

            {error && <p className="error-text">{error}</p>}

            <button type="submit" on-click>Log In</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Admin;
