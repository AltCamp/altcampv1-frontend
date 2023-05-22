import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import  { baseQuery } from "../../../constants/api";

export const StudentsSlice = createApi({
    reducerPath: "Students",
    baseQuery,
    endpoints: (builder) => ({
        getAllStudents: builder.query({
            query: () => ({
                url: "/students",
                method: "GET",
            }),
        }),
        getStudentById: builder.query({
            query: (studentId) => ({
                url: `/students/${studentId}`,
                method: "GET",
            }),
        }),
    }),
})
export const { useGetAllStudentsQuery, useGetStudentByIdQuery } = StudentsSlice;
