import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ApiRequest, ApiResponse, AppSetting } from "../types/type";
import { getLoggedUser } from '../utils/functions';
import { GetTeamRequest } from './communication/request/getTeamRequest';
import { GetTeamResponse } from './communication/response/getTeamResponse';

let appSetting: AppSetting = require('../appSetting.json');

export const TeamService = createApi({
    reducerPath: 'TeamService',

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
        GetTeamList: builder.mutation<ApiResponse<GetTeamResponse>, ApiRequest<GetTeamRequest>>({
            query: (payload) => ({
                url: 'team/getTeamList',
                method: 'post',
                body: payload
            }),
            transformResponse(response: ApiResponse<GetTeamResponse>) {
                return response;
            },
        }),


    })
});

export const { useGetTeamListMutation, } = TeamService;