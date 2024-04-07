import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  generateEntityCollectionQueryKey,
  generateEntityQueryKey,
} from "../helpers/queryKeysFactory";
import { HttpServiceType } from "../../constants";
import {
  ErrorResponse,
  IApiCrudConfig,
  IBaseApiResponse,
  ICrudResponse,
  ICustomEndpoints,
} from "../interfaces";
import { useAppSelector } from "@/hooks/useReduxHooks";
import { CRUDService } from "../../utils";
import { useHandleResponse } from "@/hooks";

export default function useHttpCRUD<
  requestParams = {},
  createRequest = {},
  updateRequest = {},
  patchRequest = {},
  getResponse = {},
  getAllResponse = {}
>(
  serviceName: HttpServiceType,
  options?: IApiCrudConfig<
    requestParams,
    createRequest,
    updateRequest,
    patchRequest,
    getResponse,
    getAllResponse
  >,
  customEndPoint?: ICustomEndpoints
) {
  //Options
  const { deleteConfig } = options ?? {};

  const queryClient = useQueryClient();
  const { handleError, handleSuccess } = useHandleResponse();

  const { token } = useAppSelector((state) => state.auth);
  const { deleteItem } = new CRUDService<{}, {}, {}, {}, {}, {}>(
    serviceName,
    customEndPoint,
    {
      token,
    }
  );

  const deleteEntity = useMutation(deleteItem, {
    ...deleteConfig,
    onSuccess: (data, variables, context) => {
      deleteConfig?.onSuccess &&
        deleteConfig.onSuccess(data, variables, context);
      // Invalidate and refetch
      queryClient.invalidateQueries([serviceName]);
      !deleteConfig?.withOutFeedBackMessage &&
        handleSuccess(data, data.message);
    },
    onError: deleteConfig?.onError
      ? (error, variables, context) => {
          deleteConfig?.onError &&
            deleteConfig.onError(error, variables, context);
          console.error("error from hook", error);
          handleError(error);
        }
      : undefined,
    onMutate: ({ id }) => {
      // Optimistically update the cache
      const oldData: any = queryClient.getQueryData(
        generateEntityCollectionQueryKey({
          entityType: serviceName,
          params: {},
        })
      );
      const oldItems = oldData?.data?.items;
      const newData = (oldItems ?? []).filter((item: any) => item.id !== id);
      queryClient.setQueryData(
        generateEntityCollectionQueryKey({
          entityType: serviceName,
          params: {},
        }),
        { ...oldData, data: { ...oldData?.data, items: newData } }
      );
      return () => {
        // Revert the optimistic update if the mutation fails
        queryClient.setQueryData(
          generateEntityCollectionQueryKey({
            entityType: serviceName,
            params: {},
          }),
          { ...oldData }
        );
      };
    },
  });

  return {
    deleteEntity,
  };
}
