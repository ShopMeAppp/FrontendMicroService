import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  // This interceptor function runs automatically before EVERY apiSlice request
  prepareHeaders: (headers, { getState }) => {
    // 1. Grab userInfo from your auth slice state
    const userInfo = getState().auth?.userInfo;

    // 2. Get the token (adjust 'userInfo.token' or 'userInfo.jwt' based on your login API return object)
    const token = userInfo?.token || userInfo?.jwt || userInfo?.accessToken;

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['Product', 'Order', 'User'],
  endpoints: (builder) => ({}),
});