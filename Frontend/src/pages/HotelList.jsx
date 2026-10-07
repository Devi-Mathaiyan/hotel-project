import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  deleteHotel,
  fetchHotels,
} from "../redux/hotelSlice";

import HotelCard from "../components/HotelCard";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import DeleteModal from "../components/DeleteModal";

import "../css/HotelList.css";

function HotelList() {
  const dispatch = useDispatch();

  const hotels = useSelector((state) => state.hotels.hotels);
  const loading = useSelector((state) => state.hotels.loading);
  const error = useSelector((state) => state.hotels.error);

  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const HOTELS_PER_PAGE = 9;

  const [selectedHotel, setSelectedHotel] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

 
  useEffect(() => {
    dispatch(fetchHotels());
  }, [dispatch]);

  const handleSearchChange = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleMinPriceChange = (value) => {
    setMinPrice(value);
    setCurrentPage(1);
  };

  const handleMaxPriceChange = (value) => {
    setMaxPrice(value);
    setCurrentPage(1);
  };

  const filteredHotels = hotels.filter((hotel) => {
    const matchesSearch = hotel.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesMinPrice =
      minPrice === "" ||
      Number(hotel.price) >= Number(minPrice);

    const matchesMaxPrice =
      maxPrice === "" ||
      Number(hotel.price) <= Number(maxPrice);

    return (
      matchesSearch &&
      matchesMinPrice &&
      matchesMaxPrice
    );
  });

  const totalPages = Math.ceil(
    filteredHotels.length / HOTELS_PER_PAGE
  );

  const startIndex =
    (currentPage - 1) * HOTELS_PER_PAGE;

  const currentHotels = filteredHotels.slice(
    startIndex,
    startIndex + HOTELS_PER_PAGE
  );

  const handleDeleteClick = (hotel) => {
    setSelectedHotel(hotel);
  };

  const handleConfirmDelete = async () => {
    if (!selectedHotel) {
      return;
    }

    try {
      await dispatch(
        deleteHotel(selectedHotel.id)
      ).unwrap();

      setSelectedHotel(null);

      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleCancelDelete = () => {
    setSelectedHotel(null);
  };

  return (
    <div className="hotel-list-page">


      {showSuccess && (
        <div className="delete-success-popup">
          ✓ Hotel deleted successfully!
        </div>
      )}

      <div className="hotel-list-header">
        <div>
          <h1>Hotels</h1>

          <p>
            Find the best hotels for your stay
          </p>
        </div>
      </div>

      <SearchBar
        search={search}
        setSearch={handleSearchChange}
        minPrice={minPrice}
        setMinPrice={handleMinPriceChange}
        maxPrice={maxPrice}
        setMaxPrice={handleMaxPriceChange}
      />

      {loading && (
        <div className="no-hotels">
          <h2>Loading Hotels...</h2>
        </div>
      )}

  
      {error && !loading && (
        <div className="no-hotels">
          <h2>Failed to load hotels</h2>
          <p>{error}</p>
        </div>
      )}


      {!loading && !error && (
        <div className="hotel-grid">

          {currentHotels.length > 0 ? (

            currentHotels.map((hotel) => (
              <HotelCard
                key={hotel.id}
                hotel={hotel}
                onDelete={handleDeleteClick}
              />
            ))

          ) : (

            <div className="no-hotels">
              <h2>No Hotels Found</h2>

              <p>
                Try changing your search or price filters.
              </p>
            </div>

          )}

        </div>
      )}

  
      {!loading && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

      <DeleteModal
        hotel={selectedHotel}
        onDelete={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />

    </div>
  );
}

export default HotelList;
