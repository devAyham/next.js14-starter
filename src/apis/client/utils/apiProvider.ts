import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import RequestConfig from "../client/interfaces/RequestConfig.interface";

export default class ApiProvider {
  private readonly axiosInstance: AxiosInstance;

  constructor(config: RequestConfig) {
    this.axiosInstance = axios.create(config);
  }

  public async request<T>(config: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.request(
        config
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
