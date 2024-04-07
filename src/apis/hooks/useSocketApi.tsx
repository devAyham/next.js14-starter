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
  onReconnectAttemp,
  onReconnectError,
  onReconnectFailed,
  onError,
}: {
  nameSpace?: SocketNameSpaces;
  options?: Partial<ManagerOptions & SocketOptions> | undefined;
  onReconnect?: (attempt: number) => void;
  onReconnectAttemp?: (attempt: number) => void;
  onReconnectError?: (err: Error) => void;
  onReconnectFailed?: () => void;
  onError?: (err: Error) => void;
}): Socket<ServerToClientEvents, ClientToServerEvents> => {
  const uri = `${process.env.NEST_BASE_API_URL}${nameSpace}`;

  const { current: socket } = useRef<
    Socket<ServerToClientEvents, ClientToServerEvents>
  >(io(uri, options));

  useEffect(() => {
    //Fired upon a successful reconnection.
    socket.io.on("reconnect", (attempt) => {
      console.info("Reconnected on attempt: " + attempt);
      onReconnect?.(attempt);
    });

    //Fired upon an attempt to reconnect.
    socket.io.on("reconnect_attempt", (attempt) => {
      console.info("Reconnecting attempt: " + attempt);
      onReconnectAttemp?.(attempt);
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
      console.info("Manager Error :" + err.message);
      onError?.(err);
    });

    socket.on("connect_error", (err) => {
      if (socket.active) {
        console.log("connection error but the socket is retrying");
        // temporary failure, the socket will automatically try to reconnect
      } else {
        // the connection was denied by the server
        // in that case, `socket.connect()` must be manually called in order to reconnect
        console.info("Socket Error :" + err.message);
        onError?.(err);
      }
    });

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [socket]);

  return socket;
};
