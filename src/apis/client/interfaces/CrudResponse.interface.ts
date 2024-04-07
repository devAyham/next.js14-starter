export interface ICrudResponse<T> {
  data: T;
  message?: string;
  extra?: any;
}
