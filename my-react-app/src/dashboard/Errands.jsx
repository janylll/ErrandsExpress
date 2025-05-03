import React, { useState } from 'react';
import PostModal from './PostModal'; 
import { useOutletContext } from 'react-router-dom';


function Errands() {
  const [showModal, setShowModal] = useState(false);
  const { posts, setPosts } = useOutletContext();
  
  const handleConfirmComplete = (indexToConfirm) => {
    setPosts(posts.map((post, idx) => {
      if (idx === indexToConfirm) {
        return { ...post, status: 'completed' };
      }
      return post;
    }));
  };
  

  const handlePost = (newPost) => {
    const now = new Date();
    const createdAt = {
      time: now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true }),
      date: now.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }),
    };

    setPosts([{ ...newPost, createdAt, status: 'pending' }, ...posts]);
  };

  const handleCancelPost = (indexToDelete) => {
    setPosts(posts.filter((_, index) => index !== indexToDelete));
  };

  const handleMarkComplete = (indexToComplete) => {
    setPosts(posts.map((post, idx) => {
      if (idx === indexToComplete) {
        return { ...post, status: 'completed' };
      }
      return post;
    }));
  };

  return (
    <div className="Pages">
      <h2 className='title4'>Your Errands</h2>
      <p className='tagline3'>Check your pending errands or create one.</p>

      <input
        className="makeerrandstext"
        placeholder="Need a quick errand?"
        onFocus={() => setShowModal(true)}
        readOnly
      />

      <PostModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handlePost}
      />

      <div className="feed">
        {posts.map((post, index) => {
          const formattedDate = new Date(post.deadlineDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });
          const [hour, minute] = post.deadlineTime.split(':');
          const dateObj = new Date();
          dateObj.setHours(hour, minute);
          const formattedTime = dateObj.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
          });

          return (
            <div key={index} className="post-card">
              <div className="post-header">
                <div className="Newfeedprofile-circle">F</div>
                <div className="name">
                  <strong>User</strong>
                  {post.createdAt && (<p className="created-at">Posted on {post.createdAt.date} at {post.createdAt.time}</p> )}
                </div>
              </div>
              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt="Uploaded"
                  className="post-image"
                />
              )}
              <p className="post-content">{post.content}</p>
                <footer className='footerpost'>
                 <div className="due-info">
                    <p><strong>Destination:</strong> {post.destination}</p>
                    <p><strong>Due Time:</strong> {formattedTime}</p>
                    <p><strong>Due Date:</strong> {formattedDate}</p>
                  </div>

                  <div className="post-footer">
                    <button className="cancel-btn" onClick={() => handleCancelPost(index)}>
                      cancel
                    </button>

                  {post.status === 'pending' && (
                    <button className="pending-btn" disabled>
                      Pending
                    </button>
                  )}

                  {post.status === 'accepted' && (
                    <button className="accepted-btn" disabled>
                      Accepted
                    </button>
                  )}

                  {post.status === 'runner_completed' && (
                    <button className="confirm-btn" onClick={() => handleConfirmComplete(index)}>
                      Confirm Completion
                    </button>
                  )}

                  {post.status === 'completed' && (
                    <button className="complete-btn" disabled>
                      Completed
                    </button>
                  )}

                  </div>
                </footer>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Errands;