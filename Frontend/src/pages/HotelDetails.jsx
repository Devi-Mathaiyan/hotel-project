import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ArrowLeft, Pencil, MapPin } from "lucide-react";
import L from "leaflet";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "../css/HotelDetails.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function HotelDetails() {
  const { id } = useParams();

  const hotels = useSelector(
    (state) => state.hotels.hotels
  );

  const hotel = hotels.find(
    (item) => String(item.id) === String(id)
  );

  if (!hotel) {
    return (
      <div className="hotel-not-found">
        <h2>Hotel Not Found</h2>

        <Link to="/hotels">
          Back to Hotels
        </Link>
      </div>
    );
  }

  const latitude = Number(hotel.latitude);
  const longitude = Number(hotel.longitude);

  if (
    !Number.isFinite(latitude) ||
    !Number.isFinite(longitude)
  ) {
    return (
      <div className="hotel-not-found">
        <h2>Invalid Hotel Location</h2>

        <Link to="/hotels">
          Back to Hotels
        </Link>
      </div>
    );
  }

  const indiaCenter = [20.5937, 78.9629];

  return (
    <div className="hotel-details-page">

      <div className="hotel-details-container">

        <img
          src={hotel.image}
          alt={hotel.title}
          className="hotel-details-image"
        />

        <div className="hotel-details-content">

          <h1 className="hotel-details-title">
            {hotel.title}
          </h1>

          <div className="hotel-details-location">

            <MapPin size={18} />

            <span>
              Latitude: {hotel.latitude}
              {" | "}
              Longitude: {hotel.longitude}
            </span>

          </div>

          <p className="hotel-details-description">
            {hotel.description}
          </p>

          <div className="hotel-info-grid">

            <div className="hotel-info-box">

              <span>
                Price Per Night
              </span>

              <strong>
                ₹{hotel.price}
              </strong>

            </div>

            <div className="hotel-info-box">

              <span>
                Latitude
              </span>

              <strong>
                {hotel.latitude}
              </strong>

            </div>

            <div className="hotel-info-box">

              <span>
                Longitude
              </span>

              <strong>
                {hotel.longitude}
              </strong>

            </div>

          </div>

      

          <div className="hotel-map-section">

            <h2>
              Hotel Location
            </h2>

            <div className="map-wrapper">

              <MapContainer
                center={indiaCenter}
                zoom={7}
                scrollWheelZoom={true}
                style={{
                  height: "400px",
                  width: "100%",
                  minHeight: "400px",
                }}
              >

                <TileLayer
                  attribution="&copy; OpenStreetMap contributors"
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Marker
                  position={[
                    latitude,
                    longitude
                  ]}
                >

                  <Popup>

                    <strong>
                      {hotel.title}
                    </strong>

                    <br />

                    ₹{hotel.price} / night

                  </Popup>

                </Marker>

              </MapContainer>

            </div>

          </div>

        
          <div className="hotel-details-price">

            ₹{hotel.price}

            <span>
              {" "} / night
            </span>

          </div>


          <div className="hotel-details-actions">

            <Link
              to="/hotels"
              className="back-btn"
            >

              <ArrowLeft size={18} />

              Back

            </Link>

            <Link
              to={`/hotels/edit/${hotel.id}`}
              className="edit-details-btn"
            >

              <Pencil size={18} />

              Edit Hotel

            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default HotelDetails;