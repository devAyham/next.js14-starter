import { useAppSelector } from "@/hooks/useReduxHooks";
import { useMutation, useQueryClient } from "react-query";
import { HttpServiceType } from "../../constants";
import { IApiCrudConfig, ICustomEndpoints } from "../interfaces";
import { useHandleResponse } from "@/hooks";
import { CRUDService } from "../utils";

export default function useHttpUpdateApi<updateRequest = {}>(
  serviceName: HttpServiceType,
  options?: IApiCrudConfig<{}, {}, updateRequest, {}, {}, {}>,
  customEndPoint?: ICustomEndpoints
) {
  //Options
  const { updateConfig } = options ?? {};
  const { handleError, handleSuccess } = useHandleResponse();

  const queryClient = useQueryClient();

  const { token } = useAppSelector((state) => state.auth);
  const { update } = new CRUDService<{}, {}, updateRequest, {}, {}, {}>(
    serviceName,
    customEndPoint,
    {
      token,
    }
  );

  const updateEntity = useMutation(update, {
    ...updateConfig,
    onSuccess: (data, variables, context) => {
      updateConfig?.onSuccess &&
        updateConfig.onSuccess(data, variables, context);
      // Invalidate and refetch
      queryClient.invalidateQueries([serviceName]);
      !updateConfig?.withOutFeedBackMessage &&
        handleSuccess(data, data.message);
    },
    onError: updateConfig?.onError
      ? (error, variables, context) => {
          updateConfig?.onError && // need narrowing
            updateConfig?.onError(error, variables, context);
          console.error("error from hook", error);
          handleError(error);
        }
      : undefined,
    onMutate: (data: any) => {
      return data;
    },
  });

  return {
    updateEntity,
  };
}
