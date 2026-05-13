import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '@/features/auth/authApi';

export interface MaintenanceModeResponse {
  id: string;
  is_enabled: boolean;
  title: string;
  description: string | null;
  start_time: string | null;
  end_time: string | null;
  expected_downtime: string | null;
  free_event_limit?: number;
  updated_at: string;
}

export type UpdateMaintenanceModeRequest = Partial<
  Pick<
    MaintenanceModeResponse,
    'is_enabled' | 'title' | 'description' | 'start_time' | 'end_time' | 'expected_downtime'
  >
>;

export const settingsApi = createApi({
  reducerPath: 'settingsApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['MaintenanceMode'],
  endpoints: (builder) => ({
    getMaintenanceMode: builder.query<MaintenanceModeResponse, void>({
      query: () => ({
        url: '/api/v1/admin/mantainance-mode/',
        method: 'GET',
      }),
      providesTags: ['MaintenanceMode'],
    }),
    updateMaintenanceMode: builder.mutation<MaintenanceModeResponse, UpdateMaintenanceModeRequest>({
      query: (body) => ({
        url: '/api/v1/admin/mantainance-mode/',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['MaintenanceMode'],
    }),
  }),
});

export const { useGetMaintenanceModeQuery, useUpdateMaintenanceModeMutation } = settingsApi;

