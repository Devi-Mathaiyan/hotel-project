import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page Not Found | HotelHub</title>
      </Helmet>

      <div className="not-found">

        <h1>404</h1>

        <h2>Page Not Found</h2>

        <p>
          The page you are looking for does not exist.
        </p>

        <Link to="/hotels">
          Go to Hotel List
        </Link>

      </div>
    </>
  );
}

export default NotFound;