import { ResultCode } from "../utils/enums";

export interface Dictionary<T> {
    [Key: string]: T;
}

export interface AppSetting {
    BaseUrl: string;
    GoogleClientId: string;
    PageSize: number
}

export type ApiResponse<T> = {
    resultCode: ResultCode,
    messages: any,
    resource: T,
};

export type ApiRequest<T> = {
    metaData?: MetaData,
    payload: T
};

export type Paging = {
    index: number;
    size: number;
}

export type MetaData = {
    paging: Paging,
    sortBy?: string[],
    orderBy?: string[],
}











