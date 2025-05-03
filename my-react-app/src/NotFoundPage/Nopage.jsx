import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="notfound-container">
      <h1 className="pagenotfound">Ohh Noo!!</h1>
      <h1 className="tagline2">Page Not Found</h1>
      <div className="goback-container">
        <Link to="/">
          <button className="goback">Go Back Home</button>
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
