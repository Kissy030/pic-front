import { API_BASE_URL } from "../../../../config";
import { request } from "../../../request";
export async function addNewPic(data: PicInfo) {
  console.log(data, "data");
  const res = await request("POST", "picInfo/upload", data);

  console.log(res, "res");
}

export async function uploadFileToOSS(file: File): Promise<PicInfo> {
  if (file.size > 10 * 1024 * 1024) {
    // 更新大小限制为10MB
    throw new Error("文件大小不能超过10MB");
  }

  const formData = new FormData();
  formData.append("image", file); // 'image' 必须与后端接收参数一致

  try {
    const response = await fetch(`${API_BASE_URL}/upload/image`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || "上传失败");
    }

    const data = await response.json(); // 应该包含 { message, url }
    return {
      pic_name: file.name,
      pic_url: data.url, // 返回的公网访问地址
    };
  } catch (error) {
    console.error("上传失败:", error);
    throw error;
  }
}
