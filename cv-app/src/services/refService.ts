import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ApiRequest, ApiResponse, AppSetting } from "../types/type";
import { getLoggedUser } from '../utils/functions';
import { ProjectStatus } from './models/projectStatus';

let appSetting: AppSetting = require('../appSetting.json');

export const RefService = createApi({
    reducerPath: 'PrefService',

    baseQuery: fetchBaseQuery({
        baseUrl: appSetting.BaseUrl,
        prepareHeaders: (headers) => {
            const currentUser = getLoggedUser();
            // Add token to headers
            if (currentUser && currentUser.accessToken) {
                headers.set('Authorization', `Bearer ${currentUser.accessToken}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        GetProjectStatus: builder.query<ApiResponse<ProjectStatus[]>, ApiRequest<{}>>({
            query: (payload) => ({
                url: 'Ref/GetProjectStatus',
                method: 'post',
                body: payload
            }),
            transformResponse(response: ApiResponse<ProjectStatus[]>) {
                return response;
            },
        }),

    })
});

export const { useGetProjectStatusQuery } = RefService;




