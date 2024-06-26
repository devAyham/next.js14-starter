import { HttpServiceType } from "../../constants/httpServicesName";

export const generateEntityQueryKey = ({
  entityType,
  entityId,
}: {
  entityType: HttpServiceType | string;
  entityId: any;
}) => {
  if (entityId) {
    return [entityType, entityId];
  }
  return [entityType];
};

export const generateEntityCollectionQueryKey = ({
  entityType,
  params,
}: {
  entityType: HttpServiceType | string;
  params: any;
}) => {
  const paramKeys = Object.keys(params ?? []).sort();
  const paramValues = paramKeys.map((key) => params[key]);
  return [entityType, ...paramValues];
};
