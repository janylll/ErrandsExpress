import { useOutletContext } from 'react-router-dom';
import logo from '../assets/ErrandsLogo.png';

function RunnerMode() {
  const { posts, setPosts } = useOutletContext();
  const availablePosts = posts.filter(post => !post.inInbox);

  const handleAcceptTask = (indexToAccept) => {
    setPosts(posts.map((post, idx) => {
      if (idx === indexToAccept) {
        return { ...post, status: 'accepted', inInbox: true };
      }
      return post;
    }));
  };

  const handleCompleteTask = (indexToComplete) => {
    setPosts(posts.map((post, idx) => {
      if (idx === indexToComplete) {
        return { ...post, status: 'runner_completed' };
      }
      return post;
    }));
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

          // Format Due Date
          const formattedDueDate = new Date(post.deadlineDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
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
                <button className="accept-btn" onClick={() => handleAcceptTask(index)}>
                  Accept Task
                </button>
              )}

              {post.status === 'accepted' && (
                <button className="complete-btn" onClick={() => handleCompleteTask(index)}>
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
