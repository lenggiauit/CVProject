import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ApiRequest, ApiResponse, AppSetting } from "../types/type";
import { getLoggedUser } from '../utils/functions';
import * as FormDataFile from "form-data";
import { TemplateType } from './models/templateType';
import { Template } from './models/template';

let appSetting: AppSetting = require('../appSetting.json');

export const TemplatteService = createApi({
    reducerPath: 'TemplateService',

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
        GetTemplateTypes: builder.mutation<ApiResponse<TemplateType[]>, ApiRequest<{ isArchived: boolean }>>({
            query: (payload) => ({
                url: 'template/getTemplateTypes',
                method: 'post',
                body: payload
            }),
            transformResponse(response: ApiResponse<TemplateType[]>) {
                return response;
            },
        }),
        GetQueryTemplateTypes: builder.query<ApiResponse<TemplateType[]>, ApiRequest<{ isArchived: boolean }>>({
            query: (payload) => ({
                url: 'template/getTemplateTypes',
                method: 'post',
                body: payload
            }),
            transformResponse(response: ApiResponse<TemplateType[]>) {
                return response;
            },
        }),
        CreateEditTemplateType: builder.mutation<ApiResponse<TemplateType>, ApiRequest<{ id: any, name: any, description: any, isArchived: boolean }>>({
            query: (payload) => ({
                url: 'template/createEditTemplateType',
                method: 'post',
                body: payload
            }),
            transformResponse(response: ApiResponse<TemplateType>) {
                return response;
            },
        }),
        GetTemplates: builder.mutation<ApiResponse<Template[]>, ApiRequest<{ isArchived: boolean }>>({
            query: (payload) => ({
                url: 'template/getTemplates',
                method: 'post',
                body: payload
            }),
            transformResponse(response: ApiResponse<Template[]>) {
                return response;
            },
        }),

        CreateEditTemplate: builder.mutation<ApiResponse<Template>, ApiRequest<{ id: any, templateTypeId: any, name: any, image: any, description: any, package: any, isArchived: boolean }>>({
            query: (payload) => ({
                url: 'template/createEditTemplate',
                method: 'post',
                body: payload
            }),
            transformResponse(response: ApiResponse<Template>) {
                return response;
            },
        }),

        GetTemplatesByFilter: builder.mutation<ApiResponse<Template[]>, ApiRequest<{ typeId?: any }>>({
            query: (payload) => ({
                url: 'template/getTemplatesByFilter',
                method: 'post',
                body: payload
            }),
            transformResponse(response: ApiResponse<Template[]>) {
                return response;
            },
        }),

        GetTemplatesById: builder.mutation<ApiResponse<Template>, ApiRequest<{ id: any }>>({
            query: (payload) => ({
                url: 'template/getTemplatesById',
                method: 'post',
                body: payload
            }),
            transformResponse(response: ApiResponse<Template>) {
                return response;
            },
        }),

    })
});

export const { useGetTemplateTypesMutation,
    useCreateEditTemplateTypeMutation,
    useCreateEditTemplateMutation,
    useGetTemplatesMutation,
    useGetQueryTemplateTypesQuery,
    useGetTemplatesByFilterMutation,
    useGetTemplatesByIdMutation } = TemplatteService;