function buildQueryParams(url: string, params?: Partial<{}>) {//should be IParams
  const _url = new URL(url);
  Object.entries(params ?? {}).forEach(([key, value]) => {
    _url.searchParams.append(key, String(value));
  });
  return _url.toString();
}

export function urlBuilder(servesName: string, params?: Partial<{}>) {//should be IParams
  return buildQueryParams(
    `${process.env.NEST_BASE_API_URL}/${servesName}`,
    params
  );
}
