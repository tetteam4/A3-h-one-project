import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  currentUser: null,
  accessToken: null,
  refreshToken: null,
  error: null,
  loading: false,
};

export const signIn = createAsyncThunk(
  "user/signIn",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/auth/user/token/",
        credentials
      );

      const { access, refresh } = response.data;

      const userProfileResponse = await axios.get(
        "http://127.0.0.1:8000/auth/api/users/",
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );
      const users = userProfileResponse.data;

      // Find the logged-in user based on email
      const loggedInUser = users.find(
        (user) => user.email === credentials.email
      );

      if (!loggedInUser) {
        return rejectWithValue("Could not find logged-in user in API response");
      }

      const userData = loggedInUser;

      return { accessToken: access, refreshToken: refresh, userData };
    } catch (error) {
      console.error("Login failed:", error);
      return rejectWithValue(error.response?.data?.detail || "Login failed");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signOutSuccess: (state) => {
      state.currentUser = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload.userData;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.error = null;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { signOutSuccess } = userSlice.actions;
export default userSlice.reducer;
