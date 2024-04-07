import { IApiCrudConfig } from "@/apis/client/interfaces";
import { ServiceName } from "../constant/ServiceName";
import ICreate from "../interfaces/Create.interface";
import IGetAllResponse from "../interfaces/GetAllResponse.interface";
import IGetResponse from "../interfaces/GetResponse.interface";
import IRequestParams from "../interfaces/RequestParams.interface";
import IUpdate from "../interfaces/Update.interface";
import { useHttpCRUDApi } from "@/apis/client/hooks";

const useEntityApi = (
  options?: IApiCrudConfig<
    IRequestParams,
    ICreate,
    IUpdate,
    IUpdate,
    IGetResponse,
    IGetAllResponse
  >
) => {
  return useHttpCRUDApi<
    IRequestParams,
    ICreate,
    IUpdate,
    IUpdate,
    IGetResponse,
    IGetAllResponse
  >(ServiceName, options);
};
export default useEntityApi;
