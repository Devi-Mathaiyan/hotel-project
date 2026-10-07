import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import "../css/HotelCard.css";

function HotelCard({ hotel, onDelete }) {
  return (
    <div className="hotel-card">
      <Link to={`/hotels/${hotel.id}`}>
        <img
          src={hotel.image}
          alt={hotel.title}
          className="hotel-card-image"
        />
      </Link>
      <div className="hotel-card-content">

        <Link
          to={`/hotels/${hotel.id}`}
          className="hotel-title-link"
        >
          <h2>{hotel.title}</h2>
        </Link>

        <p className="hotel-description">
          {hotel.description}
        </p>

        <p className="hotel-price">
          ₹{hotel.price} / night
        </p>

        <div className="hotel-card-buttons">
          <Link
            to={`/hotels/edit/${hotel.id}`}
            className="edit-btn"
          >
            <Pencil size={17} />
            Edit
          </Link>
          <button
            type="button"
            className="delete-btn"
            onClick={() => onDelete(hotel)}
          >
            <Trash2 size={17} />
            Delete
          </button>

        </div>

      </div>
    </div>
  );
}

export default HotelCard;