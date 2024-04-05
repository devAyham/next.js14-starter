export interface DefaultEventsMap {
  [event: string]: (...args: any[]) => void;
}
