import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '@/features/auth/authApi';

interface UserListItem {
  id: string;
  email: string | null;
  username: string | null;
  phone: string | null;
  fullname: string | null;
  profile_photo: string | null;
  subscription_type: string | null;
  subscription_interval: string | null;
  subscription_status: string | null;
  subscription_current_period_end: string | null;
  is_active: boolean;
  is_onboarded: boolean;
  joined_at: string;
  referral_code: string | null;
  last_login: string | null;
  account_status: string | null;
}

export interface UsersResponse {
  count: number;
  total_pages: number;
  current_page: number;
  next: string | null;
  previous: string | null;
  users: UserListItem[];
}

interface GetUsersParams {
  search?: string;
  page?: number;
}

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getUsers: builder.query<UsersResponse, GetUsersParams>({
      query: ({ search = '', page = 1 }) => ({
        url: '/api/v1/admin/users/',
        method: 'GET',
        params: {
          page,
          ...(search ? { search } : {}),
        },
      }),
    }),
  }),
});

export const { useGetUsersQuery } = usersApi;
