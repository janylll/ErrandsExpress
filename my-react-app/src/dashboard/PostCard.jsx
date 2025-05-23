
import React from 'react';
import './inbox.css'; 
import UserProfileDisplay from './ProfileDisplay';
import { useOutletContext } from 'react-router-dom';

function PostCard({ post, index, onComplete }) {
  const { userProfile } = useOutletContext();
  const dueDateObj = new Date(post.deadlineDate);
  const [hour, minute] = post.deadlineTime?.split(':') || [];
  if (!isNaN(hour)) dueDateObj.setHours(hour, minute);

  const formattedDueTime = dueDateObj.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const formattedDueDate = dueDateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="post-card">
      <div className="post-header">
      <UserProfileDisplay name={userProfile.name} image={userProfile.image} />
        {post.createdAt && (
          <p className="created-at">Posted on {post.createdAt.date} at {post.createdAt.time}</p>
        )}
      </div>

      {post.imageUrl && (
        <img src={post.imageUrl} alt="Uploaded" className="post-image" />
      )}

      <p className="post-content">{post.content}</p>

      <footer className='footerpost'>
        <div className="due-info">
          <p><strong>Destination:</strong> {post.destination}</p>
          <p><strong>Due Time:</strong> {formattedDueTime}</p>
          <p><strong>Due Date:</strong> {formattedDueDate}</p>
        </div>

        {post.status === 'accepted' && (
          <button className="complete-btn" onClick={() => onComplete(index)}>
            Complete Task
          </button>
        )}

        {post.status === 'runner_completed' && (
          <button className="waiting-btn" disabled>
            Waiting for Confirmation
          </button>
        )}

        {post.status === 'completed' && (
          <button className="complete-btn" disabled>
            Completed
          </button>
        )}
      </footer>
    </div>
  );
}

export default PostCard;
