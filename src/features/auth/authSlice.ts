import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface AuthUser {
  id: string;
  email: string;
  fullname: string | null;
  is_staff: boolean;
  is_superuser: boolean;
}

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: AuthUser | null;
}

const AUTH_STORAGE_KEY = 'gigbook_admin_auth';

const loadInitialState = (): AuthState => {
  const emptyState: AuthState = {
    accessToken: null,
    refreshToken: null,
    user: null,
  };

  const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
  if (!raw) {
    return emptyState;
  }

  try {
    const parsed = JSON.parse(raw) as AuthState;
    return {
      accessToken: parsed.accessToken ?? null,
      refreshToken: parsed.refreshToken ?? null,
      user: parsed.user ?? null,
    };
  } catch {
    return emptyState;
  }
};

const persistAuthState = (state: AuthState) => {
  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(state));
};

const clearPersistedAuthState = () => {
  window.localStorage.removeItem(AUTH_STORAGE_KEY);
};

const initialState = loadInitialState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthState>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.user;
      persistAuthState(state);
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      persistAuthState(state);
    },
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
      clearPersistedAuthState();
    },
  },
});

export const { setCredentials, setAccessToken, logout } = authSlice.actions;
export default authSlice.reducer;
