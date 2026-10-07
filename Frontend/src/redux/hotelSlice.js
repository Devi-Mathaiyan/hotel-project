
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "http://localhost:5000/api/hotels";


export const fetchHotels = createAsyncThunk(
  "hotels/fetchHotels",
  async () => {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch hotels");
    }

    return await response.json();
  }
);


export const addHotel = createAsyncThunk(
  "hotels/addHotel",
  async (hotelData) => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(hotelData),
    });

    if (!response.ok) {
      throw new Error("Failed to add hotel");
    }

    return await response.json();
  }
);


export const updateHotel = createAsyncThunk(
  "hotels/updateHotel",
  async ({ id, hotelData }) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(hotelData),
    });

    if (!response.ok) {
      throw new Error("Failed to update hotel");
    }

    return await response.json();
  }
);

export const deleteHotel = createAsyncThunk(
  "hotels/deleteHotel",
  async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete hotel");
    }

    return id;
  }
);

const initialState = {
  hotels: [],
  loading: false,
  error: null,
};

const hotelSlice = createSlice({
  name: "hotels",

  initialState,

  reducers: {},

  extraReducers: (builder) => {

    builder
      .addCase(fetchHotels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchHotels.fulfilled, (state, action) => {
        state.loading = false;
        state.hotels = action.payload;
      })

      .addCase(fetchHotels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(addHotel.pending, (state) => {
        state.loading = true;
      })

      .addCase(addHotel.fulfilled, (state, action) => {
        state.loading = false;
        state.hotels.push(action.payload);
      })

      .addCase(addHotel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });


    builder
      .addCase(updateHotel.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateHotel.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.hotels.findIndex(
          (hotel) => hotel.id === action.payload.id
        );

        if (index !== -1) {
          state.hotels[index] = action.payload;
        }
      })

      .addCase(updateHotel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });


    builder
      .addCase(deleteHotel.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteHotel.fulfilled, (state, action) => {
        state.loading = false;

        state.hotels = state.hotels.filter(
          (hotel) => hotel.id !== action.payload
        );
      })

      .addCase(deleteHotel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default hotelSlice.reducer;