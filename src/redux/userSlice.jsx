import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoadingProfile: false,
  profile: null,
  isLoadingBalance: false,
  balance: 0,
  isLoadingServices: false,
  services: null,
  isLoadingBanner: false,
  banner: null,
  isLoadingTransactionHistory: false,
  transactionHistory: null,
  error: false,
};

export const fetchUser = createAsyncThunk("userLogin", async () => {
  const token = await localStorage.getItem("token");
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
  const token = await localStorage.getItem("token");
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
  const token = await localStorage.getItem("token");
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
  const token = await localStorage.getItem("token");
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

export const fetchTransactionHistory = createAsyncThunk(
  "userTransaction",
  async ({ offset, limit }) => {
    const token = await localStorage.getItem("token");
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${
        import.meta.env.VITE_BASE_URL
      }/transaction/history?offset=${offset}&limit=${limit}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.request(config);
    return response.data;
  }
);

const userSlice = createSlice({
  name: "getUserProfile",
  initialState,
  extraReducers: (builder) => {
    // fetch user
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoadingProfile = false;
        state.profile = action.payload;
        state.error = false;
      })
      .addCase(fetchUser.pending, (state) => {
        state.isLoadingProfile = true;
        state.error = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoadingProfile = false;
        state.error = action.error.message;
      });

    // fetch balance
    builder
      .addCase(fetchBalance.fulfilled, (state, action) => {
        state.isLoadingBalance = false;
        state.balance = action.payload;
        state.error = false;
      })
      .addCase(fetchBalance.pending, (state) => {
        state.isLoadingBalance = true;
        state.error = false;
      })
      .addCase(fetchBalance.rejected, (state, action) => {
        state.isLoadingBalance = false;
        state.error = action.error.message;
      });

    // fetch services
    builder
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.isLoadingServices = false;
        state.services = action.payload;
        state.error = false;
      })
      .addCase(fetchServices.pending, (state) => {
        state.isLoadingServices = true;
        state.error = false;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.isLoadingServices = false;
        state.error = action.error.message;
      });

    // fetch Banner
    builder
      .addCase(fetchBanner.fulfilled, (state, action) => {
        state.isLoadingBanner = false;
        state.banner = action.payload;
        state.error = false;
      })
      .addCase(fetchBanner.pending, (state) => {
        state.isLoadingBanner = true;
        state.error = false;
      })
      .addCase(fetchBanner.rejected, (state, action) => {
        state.isLoadingBanner = false;
        state.error = action.error.message;
      });

    // fetch Transaction History
    builder
      .addCase(fetchTransactionHistory.fulfilled, (state, action) => {
        state.isLoadingTransactionHistory = false;
        state.transactionHistory = action.payload;
        state.error = false;
      })
      .addCase(fetchTransactionHistory.pending, (state) => {
        state.isLoadingTransactionHistory = true;
        state.error = false;
      })
      .addCase(fetchTransactionHistory.rejected, (state, action) => {
        state.isLoadingTransactionHistory = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
