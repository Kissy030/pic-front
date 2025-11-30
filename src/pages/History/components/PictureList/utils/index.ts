import { request } from "../../../../../request";
export async function getPicList() {
  const res = await request("GET", "picInfo/list");
  return res;
}
