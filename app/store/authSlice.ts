import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

type AuthState = {
  user: AuthUser | null;
  tokens: AuthTokens | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

type LoginPayload = {
  email: string;
  password: string;
};

const initialState: AuthState = {
  user: null,
  tokens: null,
  status: "idle",
  error: null,
};

export const login = createAsyncThunk<
  { user: AuthUser; tokens: AuthTokens },
  LoginPayload,
  { rejectValue: string }
>("auth/login", async (payload, { rejectWithValue }) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const normalizedBaseUrl = baseUrl ? baseUrl.replace(/\/+$/, "") : "";
  if (!normalizedBaseUrl) {
    return rejectWithValue("NEXT_PUBLIC_API_BASE_URL is not set.");
  }

  const response = await fetch(
    `${normalizedBaseUrl}/admin/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    try {
      const errorBody = await response.json();
      return rejectWithValue(errorBody?.message ?? "Login failed.");
    } catch {
      return rejectWithValue("Login failed.");
    }
  }

  const data = await response.json();
  const user = data?.data?.user;
  const tokens = data?.data?.tokens;

  if (!user || !tokens) {
    return rejectWithValue("Invalid login response.");
  }

  return { user, tokens };
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.tokens = null;
      state.status = "idle";
      state.error = null;
    },
    setAuthState(
      state,
      action: PayloadAction<{ user: AuthUser; tokens: AuthTokens }>
    ) {
      state.user = action.payload.user;
      state.tokens = action.payload.tokens;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.tokens = action.payload.tokens;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Login failed.";
      });
  },
});

export const { logout, setAuthState } = authSlice.actions;
export default authSlice.reducer;
