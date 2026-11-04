import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="page-message">
        <h1>404 Error</h1>
      <h1>Page not found</h1>
      <Link to="/">Back to contacts</Link>
    </main>
  );
}

export default NotFound;
