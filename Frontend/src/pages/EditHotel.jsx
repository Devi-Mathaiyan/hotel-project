import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateHotel } from "../redux/hotelSlice";
import "../css/HotelForm.css";

function EditHotel() {
  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const hotels = useSelector((state) => state.hotels.hotels);

  const hotel = hotels.find(
    (item) => String(item.id) === String(id)
  );

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    latitude: "",
    longitude: "",
    image: "",
  });

  useEffect(() => {
    if (hotel) {
      setFormData({
        title: hotel.title || "",
        description: hotel.description || "",
        price: hotel.price || "",
        latitude: hotel.latitude || "",
        longitude: hotel.longitude || "",
        image: hotel.image || "",
      });
    }
  }, [hotel]);

  if (!hotel) {
    return (
      <div className="hotel-form-page">
        <h2>Hotel Not Found</h2>

        <button onClick={() => navigate("/hotels")}>
          Back to Hotels
        </button>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hotelData = {
      title: formData.title,
      description: formData.description,
      price: Number(formData.price),
      latitude: Number(formData.latitude),
      longitude: Number(formData.longitude),
      image: formData.image,
    };

    try {
      
      await dispatch(
        updateHotel({
          id: hotel.id,
          hotelData: hotelData,
        })
      ).unwrap();

      alert("Hotel updated successfully!");

      navigate("/hotels");
    } catch (error) {
      console.error("Update hotel failed:", error);

      alert("Failed to update hotel. Please try again.");
    }
  };

  return (
    <div className="hotel-form-page">

      <div className="hotel-form-container">

        <h1>Edit Hotel</h1>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Hotel Name</label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter hotel name"
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter hotel description"
              rows="5"
              required
            />
          </div>

          <div className="form-group">
            <label>Price Per Night</label>

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              required
            />
          </div>

          <div className="form-group">
            <label>Latitude</label>

            <input
              type="number"
              step="any"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
              placeholder="Enter latitude"
              required
            />
          </div>

          <div className="form-group">
            <label>Longitude</label>

            <input
              type="number"
              step="any"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
              placeholder="Enter longitude"
              required
            />
          </div>

          <div className="form-group">
            <label>Image URL</label>

            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Enter image URL"
              required
            />
          </div>

          {formData.image && (
            <div className="image-preview">
              <img
                src={formData.image}
                alt="Hotel Preview"
              />
            </div>
          )}

          <div className="form-buttons">

            <button
              type="button"
              onClick={() => navigate("/hotels")}
              className="cancel-btn"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="submit-btn"
            >
              Update Hotel
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default EditHotel;