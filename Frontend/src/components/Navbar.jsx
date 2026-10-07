import { Link } from "react-router-dom";
import { Hotel, Plus } from "lucide-react";

import "../css/Navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">

        <Link to="/hotels" className="logo">
          <Hotel size={28} />
          <span>HotelHub</span>
        </Link>

        <nav className="nav-links">
          <Link to="/hotels">Hotels</Link>

          <Link to="/hotels/add" className="add-link">
            <Plus size={18} />
            Add Hotel
          </Link>
        </nav>

      </div>
    </header>
  );
}

export default Navbar;