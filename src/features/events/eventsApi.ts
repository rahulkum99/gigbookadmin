import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '@/features/auth/authApi';

interface EventUser {
  id: string;
  email: string | null;
  username: string | null;
  phone: string | null;
  fullname: string | null;
}

interface EventTeamMember {
  id: string;
  user: EventUser;
  permission: string;
  permission_display: string;
  created_at: string;
}

interface EventItem {
  id: string;
  user: EventUser;
  client: { name?: string | null } | null;
  category: { name?: string | null } | string | null;
  title: string;
  location: string | null;
  event_date: string;
  status: string;
  team_members: EventTeamMember[];
  created_at: string;
}

export interface EventsResponse {
  count: number;
  total_pages: number;
  current_page: number;
  next: string | null;
  previous: string | null;
  events: EventItem[];
}

interface GetEventsParams {
  search?: string;
  page?: number;
}

export const eventsApi = createApi({
  reducerPath: 'eventsApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getEvents: builder.query<EventsResponse, GetEventsParams>({
      query: ({ search = '', page = 1 }) => ({
        url: '/api/v1/admin/events/',
        method: 'GET',
        params: {
          page,
          ...(search ? { search } : {}),
        },
      }),
    }),
  }),
});

export const { useGetEventsQuery } = eventsApi;
