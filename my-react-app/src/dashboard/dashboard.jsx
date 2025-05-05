import { useOutletContext } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  const { posts } = useOutletContext();

  const totalErrands = posts.length;
  const completedCount = posts.filter(post => post.status === 'runner_completed').length;  

  const recentPosts = [...posts]
    .sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt))
    .slice(0, 3);

  return (
    <div className="dashboard-container">
      <h1 className='title4'>Welcome!</h1>

      <div className="stats-cards">
        <div className="card2">
          <h2>{totalErrands}</h2>
          <p>Total Errands</p>
        </div>
        <div className="card2">
          <h2>{completedCount}</h2>
          <p>Completed</p>
        </div>
        <div className="card2">
          <h2>#</h2>
          <p>Inbox</p>
        </div>
        <div className="card2">
          <h2>#</h2>
          <p>Notifications</p>
        </div>
      </div>

      <section className="recent-activity">
        <h2>Recent Errands</h2>
        <div className="feed">
          {recentPosts.map((post, index) => {
            const formattedPostedAt = new Date(post.postedAt).toLocaleString("en-US", {
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
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
