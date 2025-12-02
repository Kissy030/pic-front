import { API_BASE_URL } from "../../../../config";
import { request } from "../../../request";
export async function addNewPic(data: PicInfo) {
  console.log(data, "data");
  const res = await request("POST", "picInfo/upload", data);

  console.log(res, "res");
}

export async function requestUploadUrl(fileName: string, contentType: string) {
  const encodedContentType = encodeURIComponent(contentType);
  const res = await fetch(
    `${API_BASE_URL}/oss/upload-url?fileName=${fileName}&contentType=${encodedContentType}`
  );
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "获取上传地址失败");
  }
  return await res.json(); // { uploadUrl, accessUrl }
}
function getMimeType(filename: string): string {
  const ext = filename.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "png":
      return "image/png";
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "gif":
      return "image/gif";
    case "webp":
      return "image/webp";
    default:
      return "application/octet-stream";
  }
}
export async function uploadFileToOSS(file: File): Promise<PicInfo> {
  if (file.size > 10 * 1024 * 1024) {
    throw new Error("文件大小不能超过10MB");
  }

  const name = file.name;
  const contentType = getMimeType(file.name);
  console.log(contentType);

  const { uploadUrl, accessUrl } = await requestUploadUrl(name, contentType);

  // 直接 PUT 到 OSS
  const uploadRes = await fetch(uploadUrl, {
    method: "PUT",
    body: file,
    headers: { "Content-Type": contentType },
  });
  console.log("file.type:", file.type);
  console.log("contentType used for signing:", contentType);
  if (!uploadRes.ok) {
    const errorText = await uploadRes.text();
    console.error("OSS 错误响应:", errorText);
  }

  return {
    pic_name: name,
    pic_url: accessUrl,
  };
}
