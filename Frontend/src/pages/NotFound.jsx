import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="mx-auto my-8 grid w-[min(520px,calc(100%-32px))] justify-items-start gap-3">
        <h1>404 Error</h1>
      <h1>Page not found</h1>
      <Link to="/">Back to contacts</Link>
    </main>
  );
}

export default NotFound;
