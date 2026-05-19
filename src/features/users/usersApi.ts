import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '@/features/auth/authApi';

export interface UserListItem {
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

export interface UpdateUserRequest {
  is_active?: boolean;
  force_logout?: boolean;
  account_status?: string;
}

export interface UpdateUserResponse {
  message: string;
  user: UserListItem;
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
  tagTypes: ['Users'],
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
      providesTags: [{ type: 'Users', id: 'LIST' }],
    }),
    updateUser: builder.mutation<UpdateUserResponse, { id: string; body: UpdateUserRequest }>({
      query: ({ id, body }) => ({
        url: `/api/v1/admin/users/${id}/`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }],
    }),
  }),
});

export const { useGetUsersQuery, useUpdateUserMutation } = usersApi;
