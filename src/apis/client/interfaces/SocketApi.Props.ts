import { SocketNameSpaces } from "@/apis/constants";
import { ManagerOptions, SocketOptions } from "socket.io-client";

export interface ISocketApiProps {
  nameSpace?: SocketNameSpaces;
  options?: Partial<ManagerOptions & SocketOptions> | undefined;
  onReconnect?: (attempt: number) => void;
  onReconnectAttemp?: (attempt: number) => void;
  onReconnectError?: (err: Error) => void;
  onReconnectFailed?: () => void;
  onError?: (err: Error) => void;
}
