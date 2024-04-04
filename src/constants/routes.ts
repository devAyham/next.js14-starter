export const routes = ["home/"] as const;
export type routesType = (typeof routes)[number];

export const routesKeys = ["Home"] as const;
export type routesKeysType = (typeof routesKeys)[number];

export const RoutesNames: Record<routesKeysType, routesType> = {
  Home: "home/",
};
