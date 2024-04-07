export interface IDefaultEventsMap {
  [event: string]: (...args: any[]) => void;
}
