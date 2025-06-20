// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios"; // your preconfigured axios instance

// Thunks (including their own API calls)
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    const { data } = await axios.post("/auth/login", { email, password });
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    return data.user;
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async ({ name, email, password, avatarUrl }, thunkAPI) => {
    const { data } = await axios.post("/auth/register", {
      name,
      email,
      password,
      avatarUrl,
    });
    // If your backend returns a token here, you could store it as well
    return data;
  }
);

//  thunk for updating name/avatar
export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async ({ name, avatarUrl }, thunkAPI) => {
    // Use the logged‑in user’s ID; could also call `/users/me`
    const { auth } = thunkAPI.getState();
    const id = auth.user.id;
    const { data } = await axios.put(`/users/${id}`, { name, avatarUrl });
    // Persist updated user
    localStorage.setItem("user", JSON.stringify(data));
    return data; // the updated user object
  }
);

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // REGISTER
      .addCase(register.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      //Update profile
      .addCase(updateUserProfile.pending, (state) => {
        state.updateStatus = "loading";
        state.updateError = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        state.user = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.updateError = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
