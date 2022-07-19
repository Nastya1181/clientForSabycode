import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'http://localhost:5000'

export const sabycodeApi = createApi({
    reducerPath: 'sabycodeApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}`,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().authentication.accessToken;
            console.log('token', token);
            if (token) {
              headers.set('Authorization', `Bearer ${token}`)
            }
        
            return headers
          },
}),
tagTypes: ['Session'],
    endpoints: (builder) => ({
        login: builder.mutation({
            query(data) {
                return {
                    url: '/api/user/login',
                    method: 'POST',
                    body: data,
                    credentials: 'include',
                    validateStatus: (response, result) =>  response.status === 200 && result
                };
            },
        }),
        //logout
        logout: builder.mutation({
            query() {
                return {
                    url: '/api/user/logout',
                    method: 'POST',
                   /*  body: data, */
                    credentials: 'include',
                    validateStatus: (response, result) =>  response.status === 200 && result
                };
            },
        }),
        addFile: builder.mutation({
            query(data) {
                return {
                    url: '/api/session/addFile',
                    method: 'POST',
                    body: data,
                    credentials: 'include',
                    validateStatus: (response, result) =>  response.status === 200 && result
                };
            },
            invalidatesTags: ['Session']
        }),
        getConnections: builder.query({
            query: () => ({
                url: '/api/sessionList/getConnections',
            }),
            providesTags: result => ['Session']
        }),
        removeConnection: builder.mutation({
            query(data) {
                return {
                    url: '/api/sessionList/removeConnection',
                    method: 'POST',
                    body: data,
                    credentials: 'include',
                    validateStatus: (response, result) =>  response.status === 200 && result
                };
            },
            invalidatesTags: ['Session']
        }),
    })
});

export const {useLoginMutation, useLogoutMutation, useAddFileMutation, useGetConnectionsQuery, useRemoveConnectionMutation} = sabycodeApi;