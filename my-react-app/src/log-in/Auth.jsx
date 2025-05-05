import { useState } from 'react';
import './auth.css';
import Header2 from '../landing page/Header2.jsx';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import bgImage from '../assets/Background.png'; 
import { useEffect } from 'react';

function Auth() {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  <div className="remember-me">
    <input
      type="checkbox"
      id="rememberMe"
      checked={rememberMe}
      onChange={() => setRememberMe(!rememberMe)}
    />
    <label htmlFor="rememberMe">Remember Me</label>
  </div>

  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [uploads, setUploads] = useState({
    idPic: null,
    facePic: null,
  });

  const [error, setError] = useState('');
  const [uploadError, setUploadError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setUploads(prev => ({
      ...prev,
      [name]: files[0]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match. Please re-enter.");
      } else {
        setError('');
        setShowUploadModal(true);
      }
    } else {
      navigate('/dashboard');
    }
  };

  const handleUploadSubmit = () => {
    if (!uploads.idPic || !uploads.facePic) {
      setUploadError('Please upload both ID and Face pictures.');
      return;
    }
  
    setUploadError('');
    setShowUploadModal(false);
    setShowSuccessModal(true);
  
    const newUser = {
      id: Date.now(),
      fullname: formData.fullname,
      email: formData.email,
      idPic: URL.createObjectURL(uploads.idPic),
      facePic: URL.createObjectURL(uploads.facePic)
    };
 
    const existing = JSON.parse(localStorage.getItem('pendingVerifications') || '[]');
    existing.push(newUser);
    localStorage.setItem('pendingVerifications', JSON.stringify(existing));
 
    setFormData({ fullname: '', email: '', password: '', confirmPassword: '' });
    setUploads({ idPic: null, facePic: null });
    setShowPassword(false);
    setShowConfirmPassword(false);
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
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="auth-box">
          <h1 className='title3'>{isSignUp ? 'Welcome!' : 'Welcome Back!'}</h1>

          <div className="toggle-auth-container">
            <span className="toggle-text">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}
            </span>
            <button
              type="button"
              onClick={() => { setIsSignUp(!isSignUp); setError(''); }}
              className="toggle-auth-btn"
            >
              {isSignUp ? "Log In" : "Sign Up"}
            </button>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {isSignUp && (
              <>
                <div className="input-group">
                  <label htmlFor="fullname">Full Name</label>
                  <input
                    type="text"
                    id="fullname"
                    name="fullname"
                    placeholder="Full Name"
                    value={formData.fullname}
                    onChange={handleChange}
                    required
                  />
                </div>
              </>
            )}

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
                <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            {isSignUp && (
              <div className="input-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="password-wrapper">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <span className="eye-icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            )}
            {/* Remember Me checkbox */}
            {!isSignUp && (
              <div className="input-group remember-me-group">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <label htmlFor="rememberMe">Remember Me</label>
              </div>
            )}


            {error && <p className="error-text">{error}</p>}

            <button type="submit">
              {isSignUp ? 'Sign Up' : 'Log In'}
            </button>
          </form>

        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <button className="close-btn" onClick={() => setShowUploadModal(false)}>×</button>
            <h2>Upload Verification Photos</h2>
            <p>Please upload a photo of your ID and a clear photo of your face.</p>
            <div className="upload-group">
              <label>ID Picture</label>
              <input type="file" name="idPic" accept="image/*" onChange={handleFileChange} />
            </div>
            <div className="upload-group">
              <label>Face Picture</label>
              <input type="file" name="facePic" accept="image/*" onChange={handleFileChange} />
            </div>
            {uploadError && <p className="upload-error">{uploadError}</p>}
            <button type="button" className="submit-upload" onClick={handleUploadSubmit}>Submit</button>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <button className="close-btn" onClick={() => setShowSuccessModal(false)}>×</button>
            <h2>Uploaded Successfully!</h2>
            <p>Please wait for us to process your request.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Auth;
