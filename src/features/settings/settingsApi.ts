import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '@/features/auth/authApi';

export interface MaintenanceModeRecord {
  id: string;
  is_enabled: boolean;
  title: string;
  description: string | null;
  start_time: string | null;
  end_time: string | null;
  expected_downtime: string | null;
  updated_at: string;
}

export interface MaintenanceModeResponse extends MaintenanceModeRecord {
  free_event_limit?: number;
}

interface RawMaintenanceModeResponse {
  mantainance_mode?: Partial<MaintenanceModeRecord>;
  maintenance_mode?: Partial<MaintenanceModeRecord>;
  free_event_limit?: number;
  // Backend may also return the flat record directly on PATCH.
  id?: string;
  is_enabled?: boolean;
  title?: string;
  description?: string | null;
  start_time?: string | null;
  end_time?: string | null;
  expected_downtime?: string | null;
  updated_at?: string;
}

export type UpdateMaintenanceModeRequest = Partial<
  Pick<
    MaintenanceModeRecord,
    'is_enabled' | 'title' | 'description' | 'start_time' | 'end_time' | 'expected_downtime'
  >
>;

function normalizeMaintenanceMode(raw: RawMaintenanceModeResponse): MaintenanceModeResponse {
  const inner: Partial<MaintenanceModeRecord> =
    raw.mantainance_mode ?? raw.maintenance_mode ?? raw;

  return {
    id: inner.id ?? '',
    is_enabled: Boolean(inner.is_enabled),
    title: inner.title ?? '',
    description: inner.description ?? null,
    start_time: inner.start_time ?? null,
    end_time: inner.end_time ?? null,
    expected_downtime: inner.expected_downtime ?? null,
    updated_at: inner.updated_at ?? '',
    free_event_limit: raw.free_event_limit,
  };
}

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
      transformResponse: (response: RawMaintenanceModeResponse) =>
        normalizeMaintenanceMode(response),
      providesTags: ['MaintenanceMode'],
    }),
    updateMaintenanceMode: builder.mutation<MaintenanceModeResponse, UpdateMaintenanceModeRequest>({
      query: (body) => ({
        url: '/api/v1/admin/mantainance-mode/',
        method: 'PATCH',
        body,
      }),
      transformResponse: (response: RawMaintenanceModeResponse) =>
        normalizeMaintenanceMode(response),
      invalidatesTags: ['MaintenanceMode'],
    }),
  }),
});

export const { useGetMaintenanceModeQuery, useUpdateMaintenanceModeMutation } = settingsApi;
