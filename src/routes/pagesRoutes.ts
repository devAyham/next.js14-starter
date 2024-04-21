import { MainFeaturesRoutes } from "./mainFeaturesRoutes";
import { PagesNavigateMethods } from "./pagesNavigateMethods";
import { SubFeaturesRoutes } from "./subFeaturesRoutes";

export const PagesRotes: {
  [key in MainFeaturesRoutes]:
    | {
        [keey in SubFeaturesRoutes[key]]: Partial<
          {
            [keeey in PagesNavigateMethods]:
              | string
              | (([...partialParams]: any) => string);
          } & {
            index?: string;
          } & {
            [keeeey in string]: unknown;
          }
        >;
        // | string;
      };
} = {
  test: { index: {} },
} as const;
