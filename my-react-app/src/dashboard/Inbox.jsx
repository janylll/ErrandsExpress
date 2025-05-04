import React from 'react';
import './inbox.css';
import { useOutletContext } from 'react-router-dom';
import PostCard from './PostCard'; 

const users = [
  { id: 1, name: 'John Doe', avatar: 'R' },
  { id: 2, name: 'Jane Smith', avatar: 'S' },
  { id: 3, name: 'Admin', avatar: 'A' }
];

const messages = [
  { id: 1, from: 'user', content: 'Hi there!' },
  { id: 2, from: 'me', content: 'Hello, how can I help you?' },
  { id: 3, from: 'user', content: 'Where is my order?' }
];

function Inbox() {
  const { posts, setPosts } = useOutletContext();

  const inboxPostIndex = posts.findIndex(post => post.inInbox);
  const inboxPost = posts[inboxPostIndex];

  const handleCompleteTask = (index) => {
    setPosts(posts.map((post, idx) => {
      if (idx === index) return { ...post, status: 'runner_completed' };
      return post;
    }));
  };

  return (
    <div className="chat-layout">
      <div className="chat-sidebar">
        <h2 className="sidebar-title">Messages</h2>
        {users.map(user => (
          <div key={user.id} className="user-preview">
            <span className="profile-circle">{user.avatar}</span>
            <span>{user.name}</span>
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
          <input type="text" placeholder="Type here..." />
          <button>➤</button>
        </div>
      </div>
    </div>
  );
}

export default Inbox;
