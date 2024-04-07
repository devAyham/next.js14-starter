type ErrorData = {
  [key: string]: string[];
};

export interface ErrorResponse {
  status?: number;
  errors?: ErrorData;
  message?: string;
}
