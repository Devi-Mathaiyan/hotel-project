// const express = require("express");
// const cors = require("cors");

// require("dotenv").config();

// const hotelRoutes = require("./routes/hotelRoutes");

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use("/api/hotels", hotelRoutes);

// app.get("/", (req, res) => {
//   res.json({
//     message: "HotelHub Backend is running",
//   });
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });


const express = require("express");
const cors = require("cors");

require("dotenv").config();

require("./config/db");

const hotelRoutes = require("./routes/hotelRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/hotels", hotelRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "HotelHub Backend is running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});