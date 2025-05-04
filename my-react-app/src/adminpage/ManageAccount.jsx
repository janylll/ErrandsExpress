import { useState } from 'react';
import './admin.css';
import { useEffect } from 'react';

function ManageAccount() {
  const [activeTab, setActiveTab] = useState('verification');

  const [accounts, setAccounts] = useState({
    verification: [
      {
        id: 1,
        fullname: 'John Doe',
        email: 'john@example.com',
        idPic: 'https://via.placeholder.com/100',
        facePic: 'https://via.placeholder.com/100'
      }
    ],
    reported: [
      {
        id: 2,
        fullname: 'Jane Smith',
        email: 'jane@example.com',
        reason: 'Suspicious activity'
      }
    ],
    all: [
      {
        id: 2,
        fullname: 'Jane Smith',
        email: 'jane@example.com',
        status: 'verified'
      }
    ]
  });
  
  const handleDeny = (id) => {
    const updatedVerification = accounts.verification.filter(u => u.id !== id);
  
    setAccounts(prev => ({
      ...prev,
      verification: updatedVerification
    }));
  };
  
  const findUserById = (id) =>
    accounts.reported.find(u => u.id === id) ||
    accounts.verification.find(u => u.id === id) ||
    accounts.all.find(u => u.id === id);

  const upsertUserToAll = (newUser) => {
    const withoutUser = accounts.all.filter(u => u.id !== newUser.id);
    return [...withoutUser, newUser];
  };

  const handleVerify = (id) => {
    const user = accounts.verification.find(u => u.id === id);
    if (!user) return;

    const updatedVerification = accounts.verification.filter(u => u.id !== id);
    const updatedAll = upsertUserToAll({
      id: user.id,
      fullname: user.fullname,
      email: user.email,
      status: 'verified'
    });

    setAccounts(prev => ({
      ...prev,
      verification: updatedVerification,
      all: updatedAll
    }));
  };

  const handleBlock = (id) => {
    const user = findUserById(id);
    if (!user) return;

    alert(`Blocked account with ID ${id}`);

    const updatedReported = accounts.reported.filter(u => u.id !== id);
    const updatedAll = upsertUserToAll({ ...user, status: 'blocked' });

    setAccounts(prev => ({
      ...prev,
      reported: updatedReported,
      all: updatedAll
    }));
  };
  

  const handleSuspend = (id) => {
    const user = findUserById(id);
    if (!user) return;

    alert(`Suspended account with ID ${id}`);

    const updatedReported = accounts.reported.filter(u => u.id !== id);
    const updatedAll = upsertUserToAll({ ...user, status: 'suspended' });

    setAccounts(prev => ({
      ...prev,
      reported: updatedReported,
      all: updatedAll
    }));
  };

  const handleReinstate = (id) => {
    const user = accounts.all.find(u => u.id === id);
    if (!user) return;

    const updatedAll = upsertUserToAll({ ...user, status: 'verified' });

    setAccounts(prev => ({
      ...prev,
      all: updatedAll
    }));
  };

  const renderContent = () => {
    if (activeTab === 'verification') {
      return accounts.verification.map(user => (
        <div className="account-card" key={user.id}>
          <h3>{user.fullname}</h3>
          <p>{user.email}</p>
          <div className="images">
            <a href={user.idPic} target="_blank" rel="noopener noreferrer">
              <img src={user.idPic} alt="ID" className="clickable-img" />
            </a>
            <a href={user.facePic} target="_blank" rel="noopener noreferrer">
              <img src={user.facePic} alt="Face" className="clickable-img" />
            </a>
          </div>
          <div>
            <button className='verify-btn' onClick={() => handleVerify(user.id)}>Verify</button>
            <button className='deny-btn' onClick={() => handleDeny(user.id)}>Deny</button>
          </div>
        </div>
      ));
    }

    if (activeTab === 'reported') {
      return accounts.reported.map(user => (
        <div className="account-card" key={user.id}>
          <h3>{user.fullname}</h3>
          <p>{user.email}</p>
          <p><strong>Reason:</strong> {user.reason}</p>
          <div>
          <button className='block-btn' onClick={() => handleBlock(user.id)}>Block</button>
          <button className='suspend-btn' onClick={() => handleSuspend(user.id)}>Suspend</button>
          </div>
        </div>
      ));
    }

    if (activeTab === 'blockedSuspended') {
      return accounts.all
        .filter(user => user.status === 'blocked' || user.status === 'suspended')
        .map(user => (
          <div className="account-card" key={user.id}>
            <h3>{user.fullname}</h3>
            <p>{user.email}</p>
            <span className={`status-badge ${user.status}`}>{user.status}</span>
            <button className='reactivate-btn' onClick={() => handleReinstate(user.id)}>Re-activate</button>
          </div>
        ));
    }
    
    if (activeTab === 'all') {
      return accounts.all
        .filter(user =>
          ['verified', 'blocked', 'suspended'].includes(user.status)
        )
        .map(user => (
          <div className="account-card" key={user.id}>
            <h3>{user.fullname}</h3>
            <p>{user.email}</p>
            <span className={`status-badge ${user.status}`}>{user.status}</span>
          </div>
        ));
    }
    
    
    return accounts.all.map(user => (
      <div className="account-card" key={user.id}>
        <h3>{user.fullname}</h3>
        <p>{user.email}</p>
        <p><strong>Status:</strong> {user.status}</p>
      </div>
    ));
  };

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('pendingVerifications') || '[]');
  
    // Fetch newly reported accounts
    const savedReports = JSON.parse(localStorage.getItem('reportedUsers') || '[]');
  
    const uniqueNewReports = savedReports.filter(nr =>
      !accounts.reported.some(existing => existing.email === nr.email)
    );
  
    setAccounts(prev => ({
      ...prev,
      verification: [...prev.verification, ...stored],
      reported: [...prev.reported, ...uniqueNewReports]
    }));
  }, []);
  
  

  return (
    <div className="Pages">
      <header className="dashboard-header">
        <h1>Manage Accounts</h1>
        <div className="tabs">
          <button onClick={() => setActiveTab('verification')} className={activeTab === 'verification' ? 'active' : ''}>Need Verification</button>
          <button onClick={() => setActiveTab('reported')} className={activeTab === 'reported' ? 'active' : ''}>Reported</button>
          <button onClick={() => setActiveTab('all')} className={activeTab === 'all' ? 'active' : ''}>All Accounts</button>
          <button onClick={() => setActiveTab('blockedSuspended')} className={activeTab === 'blockedSuspended' ? 'active' : ''}>Blocked/Suspended</button>
        </div>
      </header>

      <div className="account-list">
        {renderContent()}
      </div>
    </div>
  );
}

export default ManageAccount;
