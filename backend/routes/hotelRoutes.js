const express = require("express");

const {
  getHotels,
  getHotelById,
  addHotel,
  updateHotel,
  deleteHotel,
} = require("../controllers/hotelController");

const router = express.Router();

router.get("/", getHotels);

router.get("/:id", getHotelById);

router.post("/", addHotel);

router.put("/:id", updateHotel);

router.delete("/:id", deleteHotel);

module.exports = router;