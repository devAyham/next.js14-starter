import { useAppSelector } from "@/hooks/useReduxHooks";
import { useQuery } from "react-query";
import { HttpServiceType } from "../constants";
import { generateEntityQueryKey } from "../helpers/queryKeysFactory";
import {
  ErrorResponse,
  IApiCrudConfig,
  ICrudResponse,
  ICustomEndpoints,
} from "../interfaces";
import { CRUDService } from "../utils";

export default function useHttpCRUD<requestParams = {}, getResponse = {}>(
  serviceName: HttpServiceType,
  options?: IApiCrudConfig<requestParams, {}, {}, {}, getResponse, {}>,
  customEndPoint?: ICustomEndpoints
) {
  //Options
  const { getDetailsConfig } = options ?? {};

  const { token } = useAppSelector((state) => state.auth);
  const { getDetails } = new CRUDService<
    requestParams,
    {},
    {},
    {},
    getResponse,
    {}
  >(serviceName, customEndPoint, {
    token,
  });

  const getDetailsEntity = useQuery<
    any,
    ErrorResponse,
    ICrudResponse<getResponse>
  >(
    generateEntityQueryKey({
      entityType: customEndPoint?.getEndpoint ?? serviceName,
      entityId: getDetailsConfig?.id,
    }),
    () =>
      getDetails({
        id: getDetailsConfig?.id ?? 0,
        params: getDetailsConfig?.params,
      }),
    {
      enabled: false,
      refetchOnWindowFocus: false,
      retry: 3,
      ...getDetailsConfig,
      onSuccess: (data) => {
        getDetailsConfig?.onSuccess &&
          getDetailsConfig.onSuccess(
            {
              data: data.data,
            },
            {},
            {},
            {
              ...data.extra,
            }
          );
      },
      onError: getDetailsConfig?.onError
        ? (error: ErrorResponse) => {
            getDetailsConfig?.onError &&
              getDetailsConfig.onError(error, {}, {});
          }
        : undefined,
    }
  );

  return {
    getDetailsEntity,
  };
}
