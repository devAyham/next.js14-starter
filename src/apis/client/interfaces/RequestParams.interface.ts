export interface IRequestParams<T> {
  filter?: any;
  sort?: string;
  search?: string;
  page?: number;
  items_per_page?: number;
  [key: string]: any;
}
