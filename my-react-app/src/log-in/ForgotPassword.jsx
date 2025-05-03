import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './auth.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [resendMessage, setResendMessage] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSendCode = () => {
    if (!email) return;
    setShowEmailModal(false);
    setShowCodeModal(true);
  };

  const handleVerifyCode = () => {
    if (code === '123456') { 
      setShowCodeModal(false);
      setShowResetModal(true);
    } else {
      alert('Invalid verification code.');
    }
  };

  const handlePasswordReset = () => {
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match.");
    } else {
      setPasswordError('');
      alert("Password reset successfully!");
      setShowResetModal(false);
      setEmail('');
      setCode('');
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  const handleResendCode = () => {
    setResendMessage('Verification code resent!');
    setTimeout(() => setResendMessage(''), 3000);
  };

  return (
    <div>
      <button onClick={() => setShowEmailModal(true)}>Forgot Password?</button>

      {showEmailModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <button className="close-btn" onClick={() => setShowEmailModal(false)}>×</button>
            <h2>Enter Your Email</h2>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button onClick={handleSendCode}>Send Code</button>
          </div>
        </div>
      )}

      {showCodeModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <button className="close-btn" onClick={() => setShowCodeModal(false)}>×</button>
            <h2>Enter Verification Code</h2>
            <input
              type="text"
              placeholder="Enter code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <button onClick={handleVerifyCode}>Verify</button>
            <button className="resend" onClick={handleResendCode}>Resend Code</button>
            {resendMessage && <p className="info">{resendMessage}</p>}
          </div>
        </div>
      )}

      {showResetModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <button className="close-btn" onClick={() => setShowResetModal(false)}>×</button>
            <h2>Reset Password</h2>
            <div className="password-wrapper">
              <input
                type={showNewPassword ? 'text' : 'password'}
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <span className="eye-icon" onClick={() => setShowNewPassword(!showNewPassword)}>
                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <div className="password-wrapper">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <span className="eye-icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {passwordError && <p className="error-text">{passwordError}</p>}
            <button onClick={handlePasswordReset}>Reset Password</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ForgotPassword;
