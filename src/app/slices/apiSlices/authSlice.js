import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';



export const authSlice = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://fundaorcostudy.onrender.com'}),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (body) => ({
                url: '/auth/login',
                method: 'POST',
                body,
            }),
        })
    })
})

export const {useLoginMutation} = authSlice;

