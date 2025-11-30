import { request } from "../../../../../request";

export async function sendDelete(pic_id: number) {
  const res = await request("POST", "picInfo/delete", { pic_id });
  console.log(res, 11111222);

  return res;
}
