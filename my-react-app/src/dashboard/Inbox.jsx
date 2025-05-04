import React, { useState } from 'react';
import './inbox.css';
import { useOutletContext } from 'react-router-dom';
import PostCard from './PostCard';

const users = [
  { id: 1, name: 'John Doe', avatar: 'R' },
  { id: 2, name: 'Jane Smith', avatar: 'S' },
  { id: 3, name: 'Admin', avatar: 'A' }
];

function Inbox() {
  const { posts, setPosts } = useOutletContext();
  const [messages, setMessages] = useState([
    { id: 1, from: 'user', content: 'Hi there!' },
    { id: 2, from: 'me', content: 'Hello, how can I help you?' },
    { id: 3, from: 'user', content: 'Where is my order?' }
  ]);

  const [input, setInput] = useState('');
  const [showReportForm, setShowReportForm] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  const inboxPostIndex = posts.findIndex(post => post.inInbox);
  const inboxPost = posts[inboxPostIndex];

  const handleCompleteTask = (index) => {
    setPosts(posts.map((post, idx) => {
      if (idx === index) return { ...post, status: 'runner_completed' };
      return post;
    }));
  };

  const handleSendMessage = () => {
    if (input.trim() === '') return;
    const newMessage = {
      id: messages.length + 1,
      from: 'me',
      content: input
    };
    setMessages([...messages, newMessage]);
    setInput('');
  };

  const openReportForm = (user) => {
    setSelectedUser(user);
    setShowReportForm(true);
  };

  const submitReport = () => {
    if (!reportReason.trim()) return;

    const reportedUser = {
      id: selectedUser.id,
      fullname: selectedUser.name,
      email: `${selectedUser.name.toLowerCase().replace(/\s/g, '')}@example.com`,
      reason: reportReason
    };

    const existing = JSON.parse(localStorage.getItem('reportedUsers') || '[]');
    localStorage.setItem('reportedUsers', JSON.stringify([...existing, reportedUser]));

    setReportReason('');
    setShowReportForm(false);
    alert('User has been reported.');
  };

  return (
    <div className="chat-layout">
      <div className="chat-sidebar">
        <h2 className="sidebar-title">Messages</h2>
        {users.map(user => (
          <div key={user.id} className="user-preview">
            <span className="profile-circle">{user.avatar}</span>
            <span>{user.name}</span>
            <button className="report-btn" onClick={() => openReportForm(user)}>⋮</button>
          </div>
        ))}
      </div>

      <div className="chat-main">
        <div className="chat-header">
          <span className="profile-circle">R</span>
          <span className="chat-username">John Doe</span>
        </div>

        {/* Overlay post card below header */}
        {inboxPost && (
          <div className="chat-overlay-post">
            <PostCard
              post={inboxPost}
              index={inboxPostIndex}
              onComplete={handleCompleteTask}
            />
          </div>
        )}

        <div className="chat-messages">
          {messages.map(msg => (
            <div key={msg.id} className={`chat-message ${msg.from === 'me' ? 'me' : 'user'}`}>
              {msg.content}
            </div>
          ))}
        </div>

        <div className="chat-input">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type here..."
          />
          <button onClick={handleSendMessage}>➤</button>
        </div>
      </div>

      {showReportForm && (
        <div className="report-form-overlay">
          <div className="report-form">
            <h3>Report {selectedUser.name}</h3>
            <textarea
              placeholder="Enter reason for report"
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
            />
            <div className="report-buttons">
              <button className='submitreport-btn' onClick={submitReport}>Submit</button>
              <button className='cancelreport-btn'onClick={() => setShowReportForm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Inbox;
