
import { AxiosHeaders, RawAxiosRequestHeaders } from "axios";

interface HeaderProps {
  token: string;
}

export const addHeaders = ({
  token,
}: HeaderProps): RawAxiosRequestHeaders | AxiosHeaders => {
  return {
    Authorization: `Bearer ${token}`,
  };
};
