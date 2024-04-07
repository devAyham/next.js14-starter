import { decryptData, encryptData, isRetryOnStatus } from "@/helpers";
import { useHandleResponse, useAppDispatch } from "@/hooks";
import { QueryClient, QueryClientProvider } from "react-query";
import { createWebStoragePersistor } from "react-query/createWebStoragePersistor-experimental";
import { persistQueryClient } from "react-query/persistQueryClient-experimental";

/**
 * @namespace CustomQueryClientProvider
 */
/**
 * @description have a default options and defalut onError handler
 * encrypt the query data and store it in the local storge for better preformance
 * @param {ReactNode} children - wrapped components
 */
const CustomQueryClientProvider = ({ children }: any) => {
  const dispatch = useAppDispatch();
  const { handleError } = useHandleResponse();
  // useErrorHandler();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        cacheTime: 1000 * 60 * 60 * 24, // 24 hours
        refetchOnMount: "always",
        refetchOnWindowFocus: false,
        retry(failureCount, error: any) {
          const RetryCount = 3;
          if (
            failureCount < RetryCount &&
            isRetryOnStatus(error.response?.status)
          )
            return true;
          else return false;
        },
        onError(err: any) {
          console.error("error from provider", err);
          handleError(err);
        },
      },
      mutations: {
        // onMutate() {},
        onError(err: any, variables, context) {
          handleError(err);
        },
        retry: 0,
      },
    },
  });

  const sessionStoragePersistor = createWebStoragePersistor({
    storage: window.sessionStorage,
    deserialize: decryptData,
    serialize: encryptData,
  });

  persistQueryClient({
    queryClient,
    persistor: sessionStoragePersistor,
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default CustomQueryClientProvider;
