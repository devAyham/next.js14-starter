import { notification } from "antd";
import { useAppDispatch } from "./useReduxHooks";
import { HttpStatus } from "@/apis";

type ErrorData = {
  [key: string]: string[];
};

export type ErrorResponse = {
  status?: number;
  errors?: ErrorData;
  message?: string;
};

type SuccessResponse = any;
type HandleReturnType = {
  handleError: (error: ErrorResponse, navigateTo?: string) => void;
  handleSuccess: (res: SuccessResponse, successMessage?: string) => void;
};

export const useHandleResponse = (): HandleReturnType => {
  // const dispatch = useAppDispatch();
  const showErrorMessage = (message: string) => {
    notification.error({
      message,
      duration: 4,
    });
  };
  const showSuccessMessage = (message: string) => {
    notification.success({
      message,
      duration: 3,
    });
  };

  const handleError = (error: any, navigateTo?: string) => {
    const statusCode = error?.response?.status;
    const errorMessage = error?.response?.data.message;

    if (statusCode && Object.values(HttpStatus).includes(statusCode)) {
      switch (statusCode) {
        // Handle Unauthorized error
        case HttpStatus.Unauthorized:
          showErrorMessage(errorMessage);
          //   removeUserCredantilesInStorge();
          //   dispatch(AuthSliceActions.Logout());
          //   navigate("/auth/formLogin");
          break;
        case HttpStatus.Forbidden:
          showErrorMessage(errorMessage);
          // Handle Forbidden error
          break;
        case HttpStatus.UnprocessableEntity:
          showErrorMessage(errorMessage);
          break;
        case HttpStatus.NotFound:
          //   navigate("/not-found");
          break;
        case HttpStatus.BadRequest:
          showErrorMessage(errorMessage);
          break;
        default:
          showErrorMessage("Network Error");
          break;
      }
    } else if (errorMessage) {
      showErrorMessage(errorMessage);
    } else if (error.message) {
      showErrorMessage(error.message);
    }
    if (navigateTo) {
      //   navigate(navigateTo);
    }
  };

  const handleSuccess = (res: SuccessResponse, successMessage?: string) => {
    if (successMessage) {
      showSuccessMessage(successMessage);
    }
  };

  return {
    handleError,
    handleSuccess,
  };
};
