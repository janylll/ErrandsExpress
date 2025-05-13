import React, { useState } from 'react';
import PostModal from './PostModal';
import { useOutletContext } from 'react-router-dom';
import UserProfileDisplay from './ProfileDisplay';
import TransactionModal from './TransactionModal';

function Errands() {
  const [showModal, setShowModal] = useState(false);
  const { posts, setPosts, userProfile } = useOutletContext();
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [transactionPostIndex, setTransactionPostIndex] = useState(null);
  const userType = userProfile.role; 

  const adminInfo = {
    gcashNumber: '09171234567',
    mayaNumber: '09179876543',
    name: 'Admin Name',
  };

  const handleConfirmComplete = (indexToConfirm) => {
    setTransactionPostIndex(indexToConfirm);
    setShowTransactionModal(true);
  };

  const handleTransactionSubmit = (data) => {
    console.log('Transaction Submitted:', data);

    if (transactionPostIndex !== null) {
      setPosts(posts.map((post, idx) => {
        if (idx === transactionPostIndex) {
          return {
            ...post,
            transactionData: data,
            status: 'completed',
          };
        }
        return post;
      }));
    }

    setTransactionPostIndex(null);
    setShowTransactionModal(false);
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
                <UserProfileDisplay name={userProfile.name} image={userProfile.image} />
                {post.createdAt && (
                  <div className="post-meta">
                    <p className="created-at">Posted on {post.createdAt.date} at {post.createdAt.time}</p>
                  </div>
                )}
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
                  {post.status === 'pending' && (
                    <>
                      <button className="cancel-btn" onClick={() => handleCancelPost(index)}>
                        cancel
                      </button>
                      <button className="pending-btn" disabled>
                        Pending
                      </button>
                    </>
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

      <TransactionModal
        show={showTransactionModal}
        onClose={() => setShowTransactionModal(false)}
        onSubmit={handleTransactionSubmit}
        userType={userType}
        adminInfo={adminInfo}
      />
    </div>
  );
}

export default Errands;
