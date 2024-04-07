import { useAppSelector } from "@/hooks/useReduxHooks";
import { useMutation, useQueryClient } from "react-query";
import { HttpServiceType } from "../../constants";
import { IApiCrudConfig, ICustomEndpoints } from "../interfaces";
import { useHandleResponse } from "@/hooks";
import { CRUDService } from "../utils";

export default function useHttpPatchApi<patchRequest = {}>(
  serviceName: HttpServiceType,
  options?: IApiCrudConfig<{}, {}, {}, patchRequest, {}, {}>,
  customEndPoint?: ICustomEndpoints
) {
  //Options
  const { patchConfig } = options ?? {};

  const queryClient = useQueryClient();

  const { token } = useAppSelector((state) => state.auth);
  const { handleError, handleSuccess } = useHandleResponse();

  const { patchItem } = new CRUDService<{}, {}, {}, patchRequest, {}, {}>(
    serviceName,
    customEndPoint,
    {
      token,
    }
  );

  const patchEntity = useMutation(patchItem, {
    ...patchConfig,
    onSuccess: (data, variables, context) => {
      patchConfig?.onSuccess && patchConfig.onSuccess(data, variables, context);
      // Invalidate and refetch
      queryClient.invalidateQueries([serviceName]);
      !patchConfig?.withOutFeedBackMessage && handleSuccess(data, data.message);
    },
    onError: patchConfig?.onError
      ? (error, variables, context) => {
          patchConfig?.onError &&
            patchConfig.onError(error, variables, context);

          console.error("error from hook", error);
          handleError(error);
        }
      : undefined,
    onMutate: (data: any) => {
      return data;
    },
  });

  return {
    patchEntity,
  };
}
