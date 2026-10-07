import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";

import HotelList from "./pages/HotelList";
import AddHotel from "./pages/AddHotel";
import EditHotel from "./pages/EditHotel";
import HotelDetails from "./pages/HotelDetails";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <Navbar />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/hotels" replace />} />

          <Route path="/hotels" element={<HotelList />} />

          <Route path="/hotels/add" element={<AddHotel />} />

          <Route path="/hotels/edit/:id" element={<EditHotel />} />

          <Route path="/hotels/:id" element={<HotelDetails />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default App;