import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  profile: {},
  balance: 0,
  services: {},
  banner: {},
  error: false,
};

const token = localStorage.getItem("token");

export const fetchUser = createAsyncThunk("userLogin", async () => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${import.meta.env.VITE_BASE_URL}/profile`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.request(config);
  return response.data;
});

export const fetchBalance = createAsyncThunk("userBalance", async () => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${import.meta.env.VITE_BASE_URL}/balance`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.request(config);
  return response.data;
});

export const fetchServices = createAsyncThunk("userServices", async () => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${import.meta.env.VITE_BASE_URL}/services`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.request(config);
  return response.data;
});

export const fetchBanner = createAsyncThunk("userBanner", async () => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${import.meta.env.VITE_BASE_URL}/banner`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.request(config);
  return response.data;
});

const userSlice = createSlice({
  name: "getUserProfile",
  initialState,
  extraReducers: (builder) => {
    // fetch user
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
        state.error = false;
      })
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });

    // fetch balance
    builder
      .addCase(fetchBalance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.balance = action.payload;
        state.error = false;
      })
      .addCase(fetchBalance.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(fetchBalance.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });

    // fetch services
    builder
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.services = action.payload;
        state.error = false;
      })
      .addCase(fetchServices.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });

    // fetch Banner
    builder
      .addCase(fetchBanner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.banner = action.payload;
        state.error = false;
      })
      .addCase(fetchBanner.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(fetchBanner.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
