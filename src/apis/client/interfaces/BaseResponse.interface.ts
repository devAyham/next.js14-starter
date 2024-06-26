import {UseMutationOptions, UseQueryOptions} from "react-query";
import {IPaginationConfig} from "./PaginationConfig.interface";

export interface CrudTableResponseData<T> {
    items: T[]
    pagination: IPaginationConfig
}

export interface IBaseApiResponse<T> {
    data: CrudTableResponseData<T>
    meta: any
    extra: any
}


export interface IUseQueryOptions
    extends Omit<UseQueryOptions<any, any, any, any>, "queryKey" | "queryFn"> {
}

export interface IUseMutationOptions
    extends Omit<UseMutationOptions<any, any, any, any>, "mutationFn"> {
}



