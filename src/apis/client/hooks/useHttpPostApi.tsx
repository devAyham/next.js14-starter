import { useAppSelector } from "@/hooks/useReduxHooks";
import { useMutation, useQueryClient } from "react-query";
import { HttpServiceType } from "../../constants";
import { IApiCrudConfig, ICustomEndpoints } from "../interfaces";
import { useHandleResponse } from "@/hooks";
import { CRUDService } from "../utils";

export default function useHttpPostApi<createRequest = {}>(
  serviceName: HttpServiceType,
  options?: IApiCrudConfig<{}, createRequest, {}, {}, {}, {}>,
  customEndPoint?: ICustomEndpoints
) {
  //Options
  const { createConfig } = options ?? {};

  const queryClient = useQueryClient();

  const { token } = useAppSelector((state) => state.auth);
  const { handleError, handleSuccess } = useHandleResponse();

  const { create } = new CRUDService<{}, createRequest, {}, {}, {}, {}>(
    serviceName,
    customEndPoint,
    {
      token,
    }
  );

  const createEntity = useMutation(create, {
    ...createConfig,
    onSuccess: (data, variables, context) => {
      // Invalidate and refetch
      queryClient.invalidateQueries([serviceName]);
      createConfig?.onSuccess &&
        createConfig.onSuccess(data, variables, context);
      !createConfig?.withOutFeedBackMessage &&
        handleSuccess(data, data.message);
    },
    onError: createConfig?.onError
      ? (error, variables, context) => {
          createConfig?.onError &&
            createConfig.onError(error, variables, context);
          createEntity.reset();
          console.error("error from hook", error);
          handleError(error);
        }
      : undefined,
    onMutate: (data) => {
      return data;
    },
  });

  return {
    createEntity,
  };
}
