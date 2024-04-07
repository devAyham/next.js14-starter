import { useAppSelector } from "@/hooks/useReduxHooks";
import { useQuery, useQueryClient } from "react-query";
import { HttpServiceType } from "../constants";
import { generateEntityCollectionQueryKey } from "../helpers/queryKeysFactory";
import {
  ErrorResponse,
  IApiCrudConfig,
  IBaseApiResponse,
  ICustomEndpoints,
} from "../interfaces";
import { CRUDService } from "../utils";

export default function useHttpGetAllApi<
  requestParams = {},
  getAllResponse = {}
>(
  serviceName: HttpServiceType,
  options?: IApiCrudConfig<requestParams, {}, {}, {}, {}, getAllResponse>,
  customEndPoint?: ICustomEndpoints
) {
  //Options
  const { getAllConfig } = options ?? {};

  const { token } = useAppSelector((state) => state.auth);
  const { getAll } = new CRUDService<
    requestParams,
    {},
    {},
    {},
    {},
    getAllResponse
  >(serviceName, customEndPoint, {
    token,
  });

  const getAllEntities = useQuery<
    any,
    ErrorResponse,
    IBaseApiResponse<getAllResponse>
  >(
    generateEntityCollectionQueryKey({
      entityType: customEndPoint?.getAllEndpoint ?? serviceName,
      params: getAllConfig?.params,
    }),
    () => getAll(getAllConfig?.params),
    {
      enabled: false,
      retry: 3,
      ...getAllConfig,
      onSuccess: (data: IBaseApiResponse<getAllResponse>) => {
        getAllConfig?.onSuccess &&
          getAllConfig.onSuccess(
            {
              ...data.data,
            },
            undefined,
            { ...data.meta },
            {
              ...data?.extra,
            }
          );
      },
      onError: getAllConfig?.onError
        ? (error: ErrorResponse) => {
            getAllConfig?.onError && getAllConfig.onError(error);
          }
        : undefined,
    }
  );

  return {
    getAllEntities,
  };
}
