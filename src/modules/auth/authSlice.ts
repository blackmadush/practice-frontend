import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser } from "../../services/api";
import { AuthState, LoginCredentials, User } from "../../types/auth";
import { jwtDecode } from "jwt-decode";

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const data = await loginUser(credentials.email, credentials.password);
      return data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: "Network Error" });
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        const user = decodeToken(action.payload.token);
        state.user = user;
      })
      .addCase(login.rejected, (state, action: any) => {
        state.loading = false;
        state.error =
          (action.payload as { message: string })?.message || "Login failed";
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;

function decodeToken(token: string): User {
  const decoded: any = jwtDecode(token);
  return {
    id: decoded.id,
    email: decoded.email,
    name: decoded.name,
  };
}
