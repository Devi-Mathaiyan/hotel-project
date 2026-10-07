import { useState } from "react";
import "../css/HotelForm.css";

function HotelForm({ initialData, onSubmit, buttonText }) {

  const [title, setTitle] = useState(initialData?.title || "");

  const [description, setDescription] = useState(
    initialData?.description || ""
  );

  const [latitude, setLatitude] = useState(
    initialData?.latitude || ""
  );

  const [longitude, setLongitude] = useState(
    initialData?.longitude || ""
  );

  const [price, setPrice] = useState(
    initialData?.price || ""
  );

  const [image, setImage] = useState(
    initialData?.image || ""
  );

  const [preview, setPreview] = useState(
    typeof initialData?.image === "string"
      ? initialData.image
      : ""
  );

  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }
    const imageURL = URL.createObjectURL(file);

    setImage(imageURL);
    setPreview(imageURL);

    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");
    if (!title.trim()) {
      setError("Please fill Hotel Title.");
      return;
    }

    if (!description.trim()) {
      setError("Please fill Description.");
      return;
    }

    if (!image) {
      setError("Please select Hotel Image.");
      return;
    }

    if (!latitude) {
      setError("Please fill Latitude.");
      return;
    }

    if (!longitude) {
      setError("Please fill Longitude.");
      return;
    }

    if (!price) {
      setError("Please fill Price.");
      return;
    }
    const hotelData = {
      title: title.trim(),
      description: description.trim(),
      latitude: Number(latitude),
      longitude: Number(longitude),
      price: Number(price),
      image: image,
    };

    console.log("Hotel Data:", hotelData);
    onSubmit(hotelData);
  };

  return (
    <form
      className="hotel-form"
      onSubmit={handleSubmit}
    >

      <h2>Hotel Information</h2>
      {error && (
        <div className="form-error">
          {error}
        </div>
      )}

      <div className="form-group">

        <label>Hotel Title</label>

        <input
          type="text"
          placeholder="Enter hotel title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setError("");
          }}
        />

      </div>

      <div className="form-group">

        <label>Description</label>

        <textarea
          placeholder="Enter hotel description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            setError("");
          }}
        />

      </div>

      <div className="form-group">

        <label>Hotel Image</label>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />

      </div>

      {preview && (
        <div className="image-preview">

          <p>Image Preview</p>

          <img
            src={preview}
            alt="Hotel Preview"
          />

        </div>
      )}

      <div className="form-group">

        <label>Latitude</label>

        <input
          type="number"
          step="any"
          placeholder="Example: 11.3410"
          value={latitude}
          onChange={(e) => {
            setLatitude(e.target.value);
            setError("");
          }}
        />

      </div>

      <div className="form-group">

        <label>Longitude</label>

        <input
          type="number"
          step="any"
          placeholder="Example: 77.7172"
          value={longitude}
          onChange={(e) => {
            setLongitude(e.target.value);
            setError("");
          }}
        />

      </div>

      <div className="form-group">

        <label>Price per Night</label>

        <input
          type="number"
          step="0.01"
          placeholder="Enter price"
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
            setError("");
          }}
        />

      </div>
      
      <button
        type="submit"
        className="submit-btn"
      >
        {buttonText || "Save Hotel"}
      </button>

    </form>
  );
}

export default HotelForm;