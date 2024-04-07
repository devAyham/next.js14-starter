import { AxiosRequestConfig } from "axios";
import ApiService from "./apiService";
import { ICustomEndpoints } from "../interfaces/CustomEndPoints.interface";
import { IRequestParams } from "../interfaces/RequestParams.interface";
import { httpMethodsDefaultSuffix } from "../constants/httpMethodsDefaultSuffix";
import { addHeaders } from "../helpers/addHeaders";
import { EntityIdType } from "@/types/EntityId.type";
import { ICrudResponse } from "../interfaces/CrudResponse.interface";

export class CRUDService<
  requestParams,
  createRequest,
  updateRequest,
  patchRequest,
  getResponse,
  getAllResponse
> extends ApiService {
  customEndpoints?: ICustomEndpoints;

  constructor(
    serviceName: string,
    customEndpoints?: ICustomEndpoints,
    headers?: any,
    customConfig?: AxiosRequestConfig
  ) {
    super({
      baseURL: `${process.env.REACT_APP_BASE_API_URL}${
        !customEndpoints ? serviceName : ""
      }`,
      headers: {
        ...headers,
        ...(customConfig ? customConfig.headers : (addHeaders(headers) as any)),
      },
    });
    if (customEndpoints) this.customEndpoints = customEndpoints;
  }

  public getAll = (
    params?: IRequestParams<requestParams>
  ): Promise<ICrudResponse<getAllResponse>> => {
    return this.get<ICrudResponse<getAllResponse>>(
      this.customEndpoints?.getAllEndpoint ?? "",
      {
        params: {
          ...params,
        },
      }
    );
  };

  public getDetails = ({
    id,
    params,
  }: {
    id: EntityIdType;
    params?: IRequestParams<requestParams>;
  }): Promise<ICrudResponse<getResponse>> => {
    return this.get<ICrudResponse<getResponse>>(
      `${
        this.customEndpoints?.getEndpoint ??
        httpMethodsDefaultSuffix.getEndpoint
      }${id ? "/" + id : ""}`,
      {
        params: params,
      }
    );
  };

  public create = (body: any): Promise<ICrudResponse<getResponse>> => {
    return this.post<ICrudResponse<getResponse>>(
      this.customEndpoints?.createEndpoint ??
        httpMethodsDefaultSuffix.createEndpoint,
      body
    );
  };

  public update = (
    body: any & EntityIdType
  ): Promise<ICrudResponse<getResponse>> => {
    return this.put<ICrudResponse<getResponse>>(
      `${
        this.customEndpoints?.updateEndpoint ??
        httpMethodsDefaultSuffix.updateEndpoint
      }/${body.id}`,
      body
    );
  };

  public deleteItem = ({ id }: { id: EntityIdType }): Promise<any> => {
    return this.delete(
      `${
        this.customEndpoints?.deleteEndpoint ??
        httpMethodsDefaultSuffix.deleteEndpoint
      }/${id}`
    );
  };

  public patchItem = (
    body: any & EntityIdType
  ): Promise<ICrudResponse<getResponse>> => {
    return this.patch<ICrudResponse<getResponse>>(
      `${
        this.customEndpoints?.patchEndpoint ??
        httpMethodsDefaultSuffix.patchEndpoint
      }/${body.id}`,
      body
    );
  };
}
