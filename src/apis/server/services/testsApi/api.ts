import { HttpMethod } from "@/apis/constants";
import { headerBuilder, urlBuilder } from "../../helpers";

export async function api<T>(params?: Partial<{}>): Promise<T> {
  const fullUrl = urlBuilder("test", params);

  const res = await fetch(fullUrl, {
    method: HttpMethod.GET,
    headers: headerBuilder(),
    cache: "no-cache",
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return res.json();
}
