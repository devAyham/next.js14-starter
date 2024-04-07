import {IUseMutationOptions} from "./BaseResponse.interface";

export interface IApiCrudOptions {
    serviceName: string;
    getAllOptions?: IUseMutationOptions;
    getDetailsOptions?: IUseMutationOptions;
    createOptions?: IUseMutationOptions;
    updateOptions?: IUseMutationOptions;
    deleteOptions?: IUseMutationOptions;
    patchOptions?: IUseMutationOptions;
}