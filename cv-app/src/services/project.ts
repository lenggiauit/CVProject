import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ApiRequest, ApiResponse, AppSetting } from "../types/type";
import { getLoggedUser } from '../utils/functions';
import { GetProjectRequest } from './communication/request/getProjectRequest';
import { GetProjectResponse } from './communication/response/getProjectResponse';
import * as FormDataFile from "form-data";
import { Project } from './models/project';
import { ProjectDetail } from './models/projectDetail';

let appSetting: AppSetting = require('../appSetting.json');

export const ProjectService = createApi({
    reducerPath: 'ProjectService',

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
        GetProjectListByUser: builder.mutation<ApiResponse<Project[]>, ApiRequest<GetProjectRequest>>({
            query: (payload) => ({
                url: 'Project/getProjectListByUser',
                method: 'post',
                body: payload
            }),
            transformResponse(response: ApiResponse<Project[]>) {
                return response;
            },
        }),
        GetProjectDetailById: builder.mutation<ApiResponse<ProjectDetail>, ApiRequest<any>>({
            query: (payload) => ({
                url: 'Project/getProjectDetailById',
                method: 'post',
                body: payload
            }),
            transformResponse(response: ApiResponse<ProjectDetail>) {
                return response;
            },
        }),
        CreateProject: builder.mutation<ApiResponse<Project>, ApiRequest<{ name: string, description: string, statusId: string }>>({
            query: (payload) => ({
                url: 'Project/createProject',
                method: 'post',
                body: payload
            }),
            transformResponse(response: ApiResponse<Project>) {
                return response;
            },
        }),
    })
});

export const { useGetProjectListByUserMutation, useGetProjectDetailByIdMutation, useCreateProjectMutation } = ProjectService;