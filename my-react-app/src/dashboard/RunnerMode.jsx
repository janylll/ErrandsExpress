import { useOutletContext } from 'react-router-dom';
import UserProfileDisplay from './ProfileDisplay';

function RunnerMode() {
  const { posts, setPosts, userProfile } = useOutletContext();
  const availablePosts = posts.filter(post => !post.inInbox);
  const handleSubmit = () => {
    onSubmit({
      ...postData,
      id: Date.now(), // Unique ID
      status: 'pending',
      postedAt: new Date().toISOString(),
    });
    onClose();
    setPostData({
      content: '',
      deadlineDate: '',
      deadlineTime: '',
      destination: '',
      imageUrl: '',
    });
  };
  
  const handleAcceptTask = (acceptedPost) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post === acceptedPost ? { ...post, status: 'accepted', inInbox: true } : post
      )
    );
  };
  
  const handleCompleteTask = (completedPost) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post === completedPost ? { ...post, status: 'runner_completed' } : post
      )
    );
  };
  

  return (
    <div className='Pages'>
      <h2 className='title4'>Errands to Run</h2>

      <div className="feed">
      {availablePosts.map((post, index) => {

          const postedDateTime = new Date(post.postedAt);
          const formattedPostedDateTime = postedDateTime.toLocaleString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          });
          
          const dueTimeParts = post.deadlineTime?.split(":") || [];
          const dueDateTime = new Date(post.deadlineDate);
          if (dueTimeParts.length === 2) {
            dueDateTime.setHours(dueTimeParts[0], dueTimeParts[1]);
          }
          const formattedDueTime = dueDateTime.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          });

          const formattedDueDate = new Date(post.deadlineDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
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
                <img src={post.imageUrl} alt="Uploaded" className="post-image" />
              )}
              <p className="post-content">{post.content}</p>

              <footer className='footerpost'>
                <div className="due-info">
                  <p><strong>Destination:</strong> {post.destination}</p>
                  <p><strong>Due Time:</strong> {formattedDueTime}</p>
                  <p><strong>Due Date:</strong> {formattedDueDate}</p>
                </div>
              </footer>

              {post.status === 'pending' && (
                <button className="accept-btn" onClick={() => handleAcceptTask(post)}>
                  Accept Task
                </button>
              )}

              {post.status === 'accepted' && (
                <button className="complete-btn" onClick={() => handleCompleteTask(post)}>
                  Complete Task
                </button>
              )}

              {post.status === 'runner_completed' && (
                <button className="waiting-btn" disabled>
                  Waiting for Confirmation
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RunnerMode;
