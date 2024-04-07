import { SocketNameSpaces } from "@/apis";
import { useEffect, useRef } from "react";
import io, { ManagerOptions, Socket, SocketOptions } from "socket.io-client";
import { IDefaultEventsMap, EventsMap } from "../interfaces";

export const useSocket = <
  ServerToClientEvents extends EventsMap = IDefaultEventsMap,
  ClientToServerEvents extends EventsMap = ServerToClientEvents
>({
  nameSpace,
  options,
  onReconnect,
  onReconnectError,
  onReconnectFailed,
}: {
  nameSpace?: SocketNameSpaces;
  options?: Partial<ManagerOptions & SocketOptions> | undefined;
  onReconnect?: (attempt: number) => void;
  onReconnectError?: (err: Error) => void;
  onReconnectFailed?: () => void;
}): Socket<ServerToClientEvents, ClientToServerEvents> => {
  const uri = `${process.env.NEST_BASE_API_URL}${nameSpace}`;

  const { current: socket } = useRef<
    Socket<ServerToClientEvents, ClientToServerEvents>
  >(io(uri, options));

  useEffect(() => {
    socket.io.on("reconnect", (attempt) => {
      console.info("Reconnected on attempt: " + attempt);
      onReconnect?.(attempt);
    });

    socket.io.on("reconnect_error", (error) => {
      console.info("Reconnection error: " + error);
      onReconnectError?.(error);
    });

    socket.io.on("reconnect_failed", () => {
      console.info("Reconnection failure.");
      onReconnectFailed?.();
    });

    socket.io.on("error", (err) => {
      console.info("Socket Error :" + err.message);
    });

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [socket]);

  return socket;
};
