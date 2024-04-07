import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  generateEntityCollectionQueryKey,
  generateEntityQueryKey,
} from "../helpers/queryKeysFactory";
import { HttpServiceType } from "../constants";
import {
  ErrorResponse,
  IApiCrudConfig,
  IBaseApiResponse,
  ICrudResponse,
  ICustomEndpoints,
} from "../interfaces";
import { useAppSelector } from "@/hooks/useReduxHooks";
import { CRUDService } from "../utils";

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
  const {
    getAllConfig,
    getDetailsConfig,
    deleteConfig,
    patchConfig,
    updateConfig,
    createConfig,
  } = options ?? {};

  const queryClient = useQueryClient();

  const { token } = useAppSelector((state) => state.auth);
  const { create, deleteItem, getAll, getDetails, update, patchItem } =
    new CRUDService<
      requestParams,
      createRequest,
      updateRequest,
      patchRequest,
      getResponse,
      getAllResponse
    >(serviceName, customEndPoint, {
      token: token,
    });

  // get All entities
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
      // onError: (error: ErrorResponse) => {
      //   getAllConfig?.onError && getAllConfig.onError(error);
      // },
    }
  );

  //get Details Entity
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
      // onError: (error: ErrorResponse) => {
      //   getDetailsConfig?.onError && getDetailsConfig.onError(error, {}, {});
      // },
    }
  );

  // create entity
  const createEntity = useMutation(create, {
    ...createConfig,
    onSuccess: (data, variables, context) => {
      // Invalidate and refetch
      queryClient.invalidateQueries([serviceName]);
      createConfig?.onSuccess &&
        createConfig.onSuccess(data, variables, context);
      // !createConfig?.withOutFeedBackMessage &&
      //   handleSuccess(data, data.message);
    },
    // onError: (error, variables, context) => {
    //   createConfig?.onError && createConfig.onError(error, variables, context);
    //   !createConfig?.withOutFeedBackMessage && handleError(error);
    //   createEntity.reset();
    // },
    onMutate: (data) => {
      return data;
    },
  });

  // update Entity
  const updateEntity = useMutation(update, {
    ...updateConfig,
    onSuccess: (data, variables, context) => {
      updateConfig?.onSuccess &&
        updateConfig.onSuccess(data, variables, context);
      // Invalidate and refetch
      queryClient.invalidateQueries([serviceName]);
      // !updateConfig?.withOutFeedBackMessage &&
      //   handleSuccess(data, data.message);
    },
    onError: (error, variables, context) => {
      updateConfig?.onError && updateConfig.onError(error, variables, context);
    },
    onMutate: (data: any) => {
      return data;
    },
  });

  // patch Entity
  const patchEntity = useMutation(patchItem, {
    ...patchConfig,
    onSuccess: (data, variables, context) => {
      patchConfig?.onSuccess && patchConfig.onSuccess(data, variables, context);
      // Invalidate and refetch
      queryClient.invalidateQueries([serviceName]);
      // !patchConfig?.withOutFeedBackMessage && handleSuccess(data, data.message);
    },
    // onError: (error, variables, context) => {
    // !patchConfig?.withOutFeedBackMessage && handleError(error);
    //   patchConfig?.onError && patchConfig.onError(error, variables, context);
    // },
    onMutate: (data: any) => {
      return data;
    },
  });

  // delete entity
  const deleteEntity = useMutation(deleteItem, {
    ...deleteConfig,
    onSuccess: (data, variables, context) => {
      deleteConfig?.onSuccess &&
        deleteConfig.onSuccess(data, variables, context);
      // Invalidate and refetch
      queryClient.invalidateQueries([serviceName]);
      // !deleteConfig?.withOutFeedBackMessage &&
      //   handleSuccess(data, data.message);
    },
    // onError: (error, variables, context) => {
    //   const contextCallback = context as any;
    //   contextCallback();

    //   deleteConfig?.onError && deleteConfig.onError(error, variables, context);
    //   !deleteConfig?.withOutFeedBackMessage && handleError(error);
    // },
    onMutate: ({ id }) => {
      // Optimistically update the cache
      const oldData: any = queryClient.getQueryData(
        generateEntityCollectionQueryKey({
          entityType: serviceName,
          params: getAllConfig?.params,
        })
      );
      const oldItems = oldData?.data?.items;
      const newData = (oldItems ?? []).filter((item: any) => item.id !== id);
      queryClient.setQueryData(
        generateEntityCollectionQueryKey({
          entityType: serviceName,
          params: getAllConfig?.params,
        }),
        { ...oldData, data: { ...oldData?.data, items: newData } }
      );
      return () => {
        // Revert the optimistic update if the mutation fails
        queryClient.setQueryData(
          generateEntityCollectionQueryKey({
            entityType: serviceName,
            params: getAllConfig?.params,
          }),
          { ...oldData }
        );
      };
    },
  });

  return {
    getAllEntities,
    getDetailsEntity,
    createEntity,
    updateEntity,
    deleteEntity,
    patchEntity,
  };
}
