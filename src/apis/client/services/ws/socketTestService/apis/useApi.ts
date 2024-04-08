import { useSocket } from "@/apis/client";
import { ISocketApiProps } from "@/apis/client/interfaces";
import { NameSpace } from "../constant/ServiceNameSpace";
import { ClientToServerEvents } from "../interfaces/ClientToSeverEvents.interface";
import { ServerToClientEvents } from "../interfaces/ServerToClientEvents.interface";

export const useApi = (props: Omit<ISocketApiProps, "nameSpace">) => {
  return useSocket<ServerToClientEvents, ClientToServerEvents>({
    nameSpace: NameSpace,
    ...props,
  });
};
