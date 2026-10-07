const pool = require("../config/db");

// GET all hotels
const getHotels = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM hotels ORDER BY id ASC"
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch hotels",
    });
  }
};

// GET one hotel
const getHotelById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM hotels WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Hotel not found",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch hotel",
    });
  }
};

// POST hotel
const addHotel = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      latitude,
      longitude,
      image,
    } = req.body;

    const result = await pool.query(
      `INSERT INTO hotels
       (title, description, price, latitude, longitude, image)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        title,
        description,
        price,
        latitude,
        longitude,
        image,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to add hotel",
    });
  }
};

// PUT hotel
const updateHotel = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      description,
      price,
      latitude,
      longitude,
      image,
    } = req.body;

    const result = await pool.query(
      `UPDATE hotels
       SET
         title = $1,
         description = $2,
         price = $3,
         latitude = $4,
         longitude = $5,
         image = $6
       WHERE id = $7
       RETURNING *`,
      [
        title,
        description,
        price,
        latitude,
        longitude,
        image,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Hotel not found",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to update hotel",
    });
  }
};

// DELETE hotel
const deleteHotel = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM hotels WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Hotel not found",
      });
    }

    res.json({
      message: "Hotel deleted successfully",
      hotel: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to delete hotel",
    });
  }
};

module.exports = {
  getHotels,
  getHotelById,
  addHotel,
  updateHotel,
  deleteHotel,
};