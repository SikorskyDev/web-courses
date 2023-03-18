import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CourseByIdType, CourseListType } from '../types/apiTypes';


export const courseListApi = createApi({
    reducerPath: 'courseListApi',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5555",

    }),

    endpoints: (builder) => ({
        getAllCourses: builder.query<CourseListType, void>({
            query: () => '/api/v1/core/preview-courses',
            keepUnusedDataFor: 3600
        }),
        getCourseById: builder.query<CourseByIdType, string>({
            query: (id) => `/api/v1/core/preview-courses/${id}`,
            keepUnusedDataFor: 3600
        })
    }),

})

export const { useGetAllCoursesQuery, useGetCourseByIdQuery } = courseListApi;