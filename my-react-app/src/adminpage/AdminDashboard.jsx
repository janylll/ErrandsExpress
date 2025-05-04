import './admin.css';
import '../dashboard/dashboard.css';
function AdminDashboard() {
  return (
  <div className='Pages2'>
    <div className="dashboard-container">
      <h1 className='title4'>Welcome Admin!</h1>
      <div className="stats-cards">
        <div className="card2">
          <h2>#</h2>
          <p>Total Accounts</p>
        </div>
        <div className="card2">
          <h2>#</h2>
          <p>Verify Accounts</p>
        </div>
        <div className="card2">
          <h2>#</h2>
          <p>Reports</p>
        </div>
        <div className="card2">
          <h2>#</h2>
          <p>Transactions</p>
        </div>
      </div>
    </div>
  </div>
  );
}
export default AdminDashboard;
