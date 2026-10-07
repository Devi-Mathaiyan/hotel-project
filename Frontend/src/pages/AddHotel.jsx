import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import HotelForm from "../components/HotelForm";
import { addHotel } from "../redux/hotelSlice";

import "../css/HotelForm.css";

function AddHotel() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddHotel = async (hotelData) => {
    console.log("ADD HOTEL FUNCTION CALLED");
    console.log(hotelData);

    try {
   
      await dispatch(addHotel(hotelData)).unwrap();

      alert("Hotel added successfully!");

      navigate("/hotels");
    } catch (error) {
      console.error("Add hotel failed:", error);

      alert("Failed to add hotel. Please try again.");
    }
  };

  return (
    <>
      <Helmet>
        <title>Add Hotel | HotelHub</title>

        <meta
          name="description"
          content="Add a new hotel to HotelHub."
        />
      </Helmet>

      <div className="form-page">

        <div className="page-heading">

          <h1>Add New Hotel</h1>

          <p>
            Add hotel details, location and price.
          </p>

        </div>

        <HotelForm
          onSubmit={handleAddHotel}
          buttonText="Add Hotel"
        />

      </div>
    </>
  );
}

export default AddHotel;
