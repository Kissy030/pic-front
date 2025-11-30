import { request } from "../../../request";
export async function addNewPic(data: PicInfo) {
  console.log(data, "data");
  const res = await request("POST", "picInfo/upload", data);

  console.log(res, "res");
}

export async function requestUploadUrl(fileName: string) {
  const res = await fetch(
    `/api/oss/upload-url?fileName=${encodeURIComponent(fileName)}`
  );
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "获取上传地址失败");
  }
  return await res.json(); // { uploadUrl, objectName, accessUrl }
}

export async function uploadFileToOSS(file: File): Promise<PicInfo> {
  if (file.size > 10 * 1024 * 1024) {
    throw new Error("文件大小不能超过10MB");
  }

  const ext = file.name.split(".").pop() || "";
  const safeName = `${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}.${ext}`;

  const { uploadUrl, accessUrl } = await requestUploadUrl(safeName);

  // 直接 PUT 到 OSS
  const uploadRes = await fetch(uploadUrl, {
    method: "PUT",
    body: file,
    headers: {
      "Content-Type": file.type || "application/octet-stream",
    },
  });

  if (!uploadRes.ok) {
    throw new Error("上传失败，请重试");
  }

  return {
    pic_name: "",
    pic_url: accessUrl,
  };
}
