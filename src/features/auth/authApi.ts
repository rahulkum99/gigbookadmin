import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import type { RootState } from '@/store/store';
import { logout, setAccessToken, setCredentials, type AuthUser } from './authSlice';

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  access: string;
  refresh: string;
  user: AuthUser;
}

interface RefreshTokenResponse {
  access: string;
}

interface LogoutRequest {
  refresh: string;
}

const baseUrl =
  (import.meta as ImportMeta & { env?: Record<string, string | undefined> }).env
    ?.VITE_API_URL || 'https://api.gigbook.in';

const rawBaseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state.auth.accessToken;

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    headers.set('Content-Type', 'application/json');
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  const requestUrl = typeof args === 'string' ? args : args.url;
  const isRefreshRequest = requestUrl.includes('/api/v1/auth/token/refresh/');

  if (result.error?.status === 401 && !isRefreshRequest) {
    const refreshToken = (api.getState() as RootState).auth.refreshToken;

    if (!refreshToken) {
      api.dispatch(logout());
      return result;
    }

    const refreshResult = await rawBaseQuery(
      {
        url: '/api/v1/auth/token/refresh/',
        method: 'POST',
        body: { refresh: refreshToken },
      },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      const data = refreshResult.data as RefreshTokenResponse;
      api.dispatch(setAccessToken(data.access));

      // Retry the original request with the refreshed access token.
      result = await rawBaseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/api/v1/admin/login/',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            setCredentials({
              accessToken: data.access,
              refreshToken: data.refresh,
              user: data.user,
            })
          );
        } catch {
          // Errors are handled by the login page UI.
        }
      },
    }),
    logoutUser: builder.mutation<{ message: string }, LogoutRequest>({
      query: (payload) => ({
        url: '/api/v1/auth/logout/',
        method: 'POST',
        body: payload,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } finally {
          // Always clear local auth state after logout attempt.
          dispatch(logout());
        }
      },
    }),
  }),
});

export const { useLoginMutation, useLogoutUserMutation } = authApi;
