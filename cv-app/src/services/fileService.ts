import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ApiRequest, ApiResponse, AppSetting } from "../types/type";
import { getLoggedUser } from '../utils/functions';
import { GetProjectRequest } from './communication/request/getProjectRequest';
import { GetProjectResponse } from './communication/response/getProjectResponse';
import * as FormDataFile from "form-data";
import { FileResponse } from './communication/response/fileResponse';

let appSetting: AppSetting = require('../appSetting.json');

export const FileService = createApi({
    reducerPath: 'FileService',

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
        UploadImage: builder.mutation<ApiResponse<FileResponse>, FormData>({
            query: (payload) => ({
                url: 'file/uploadImage',
                method: 'post',
                body: payload,

            }),
            transformResponse(response: ApiResponse<FileResponse>) {
                return response;
            },
        }),
        UploadPackageFile: builder.mutation<ApiResponse<FileResponse>, FormData>({
            query: (payload) => ({
                url: 'file/uploadPackageFile',
                method: 'post',
                body: payload,

            }),
            transformResponse(response: ApiResponse<FileResponse>) {
                return response;
            },
        }),

    })
});

export const { useUploadImageMutation, useUploadPackageFileMutation } = FileService;