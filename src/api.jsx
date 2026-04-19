import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const rawBaseQuery = fetchBaseQuery({
  baseUrl: '/api',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token');
    if (token) headers.set('Authorization', `Bearer ${token}`);
    return headers;
  },
});

// Wraps the base query to fire a global event on 401 so App can log the user out.
const baseQueryWithAuth = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);
  if (result.error?.status === 401) {
    window.dispatchEvent(new CustomEvent('api:unauthorized'));
  }
  return result;
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithAuth,
  tagTypes: ['Scan', 'Path'],
  endpoints: (builder) => ({

    // ── Auth ──────────────────────────────────────────────────────────────
    login: builder.mutation({
      query: ({ username, password }) => ({
        url: '/auth/token',
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ username, password }).toString(),
      }),
    }),

    register: builder.mutation({
      query: ({ username, email, password }) => ({
        url: '/auth/register',
        method: 'POST',
        body: { username, email, password },
      }),
    }),

    googleLogin: builder.mutation({
      query: ({ credential }) => ({
        url: '/auth/google',
        method: 'POST',
        body: { credential },
      }),
    }),

    // ── Scans ─────────────────────────────────────────────────────────────
    getScans: builder.query({
      query: () => '/scans',
      providesTags: ['Scan'],
    }),

    getScan: builder.query({
      query: (id) => `/scans/${id}`,
      providesTags: (result, error, id) => [{ type: 'Scan', id }],
    }),

    createScan: builder.mutation({
      query: (body) => ({ url: '/scans', method: 'POST', body }),
      invalidatesTags: ['Scan'],
    }),

    // ── Graph / Actions ───────────────────────────────────────────────────
    getScanActions: builder.query({
      query: (scanId) => `/scans/${scanId}/actions`,
    }),

    // ── Accessibility ─────────────────────────────────────────────────────
    getScanAccessibility: builder.query({
      query: (scanId) => `/scans/${scanId}/accessibility`,
    }),

    // ── Paths ─────────────────────────────────────────────────────────────
    getPaths: builder.query({
      query: (scanId) => `/scans/${scanId}/path`,
      providesTags: (result, error, scanId) => [{ type: 'Path', id: scanId }],
    }),

    createPath: builder.mutation({
      query: ({ scanId, ...body }) => ({
        url: `/scans/${scanId}/path`,
        method: 'POST',
        body,
      }),
      invalidatesTags: (result, error, { scanId }) => [{ type: 'Path', id: scanId }],
    }),

    deletePath: builder.mutation({
      query: ({ scanId, pathId }) => ({
        url: `/scans/${scanId}/path/${pathId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { scanId }) => [{ type: 'Path', id: scanId }],
    }),

    // ── Path Runs ─────────────────────────────────────────────────────────
    getPathRuns: builder.query({
      query: ({ scanId, pathId }) => `/scans/${scanId}/path/${pathId}/runs`,
    }),

  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGoogleLoginMutation,
  useGetScansQuery,
  useGetScanQuery,
  useCreateScanMutation,
  useGetScanActionsQuery,
  useGetScanAccessibilityQuery,
  useGetPathsQuery,
  useCreatePathMutation,
  useDeletePathMutation,
  useGetPathRunsQuery,
} = api;
