import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '@/features/auth/authApi';

export type ExportDatasetId = 'users-list' | 'subscriptions-list' | 'revenue-summary';

export type ExportType = 'users' | 'subscriptions' | 'revenue';

const ENDPOINT_BY_DATASET: Record<ExportDatasetId, string> = {
  'users-list': '/api/v1/admin/exports/users/csv/',
  'subscriptions-list': '/api/v1/admin/exports/subscriptions/csv/',
  'revenue-summary': '/api/v1/admin/exports/revenue/csv/',
};

const FILENAME_BY_DATASET: Record<ExportDatasetId, string> = {
  'users-list': 'users.csv',
  'subscriptions-list': 'subscriptions.csv',
  'revenue-summary': 'revenue-summary.csv',
};

export const EXPORT_TYPE_BY_DATASET: Record<ExportDatasetId, ExportType> = {
  'users-list': 'users',
  'subscriptions-list': 'subscriptions',
  'revenue-summary': 'revenue',
};

export interface CsvDownloadResult {
  blob: Blob;
  filename: string;
}

export interface ExportHistoryItem {
  id: string;
  export_type: ExportType | string;
  export_type_label: string;
  row_count: number;
  downloaded_by_email: string;
  generated_at: string;
}

export interface ExportsHistoryResponse {
  count: number;
  total_pages: number;
  current_page: number;
  next: string | null;
  previous: string | null;
  exports: ExportHistoryItem[];
  last_generated: Partial<Record<ExportType, string | null>>;
}

// Pull a filename from a Content-Disposition header when the server provides one.
const parseFilenameFromContentDisposition = (header: string | null): string | null => {
  if (!header) return null;

  const utf8Match = header.match(/filename\*\s*=\s*UTF-8''([^;]+)/i);
  if (utf8Match?.[1]) {
    try {
      return decodeURIComponent(utf8Match[1].trim().replace(/^"|"$/g, ''));
    } catch {
      // fall through to the ASCII variant
    }
  }

  const asciiMatch = header.match(/filename\s*=\s*"?([^";]+)"?/i);
  return asciiMatch?.[1]?.trim() ?? null;
};

export const exportsApi = createApi({
  reducerPath: 'exportsApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['ExportHistory'],
  endpoints: (builder) => ({
    getExportsHistory: builder.query<ExportsHistoryResponse, void>({
      query: () => ({
        url: '/api/v1/admin/exports/history/',
        method: 'GET',
      }),
      providesTags: ['ExportHistory'],
    }),
    downloadExportCsv: builder.mutation<CsvDownloadResult, ExportDatasetId>({
      query: (datasetId) => ({
        url: ENDPOINT_BY_DATASET[datasetId],
        method: 'GET',
        responseHandler: async (response) => {
          const blob = await response.blob();
          const filename =
            parseFilenameFromContentDisposition(response.headers.get('content-disposition')) ??
            FILENAME_BY_DATASET[datasetId];
          return { blob, filename } satisfies CsvDownloadResult;
        },
        cache: 'no-cache',
      }),
      // A successful download creates a new history entry on the server.
      invalidatesTags: (_result, error) => (error ? [] : ['ExportHistory']),
    }),
  }),
});

export const { useGetExportsHistoryQuery, useDownloadExportCsvMutation } = exportsApi;
