import "./index.less";
import { sendDelete } from "./utils";
import { message } from "antd";
interface PictureItemProps {
  pictureInfo: PicInfo;
  onDelete: () => void;
}
export default function PictureItem(props: PictureItemProps) {
  const [messageApi, contextHolder] = message.useMessage();
  const { pictureInfo, onDelete } = props;
  const { pic_id, pic_name, pic_url } = pictureInfo;

  const handleCopyToClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      handleSuccessMessage("复制");
    } catch (error) {
      console.log(error);
    }
  };
  const handleSuccessMessage = (message: string) => {
    messageApi.open({
      type: "success",
      content: `${message}成功`,
    });
  };
  const handleDelete = async () => {
    try {
      if (pic_id) {
        const deleteResult = await sendDelete(pic_id);
        if (deleteResult.statusCode === 200) {
          onDelete();
          handleSuccessMessage("删除");
        }
      }
    } catch (error) {
      console.log(111, error);
    }
  };
  return (
    <div className="picture-item">
      <div className="history-content">
        <img src={pic_url} className="item-preview" />
        <span className="item-name">{pic_name}</span>
        <span className="item-url">{pic_url}</span>
        <>{contextHolder}</>
        <div className="history-button-box">
          <button
            className="delete-history-button"
            onClick={() => handleCopyToClipBoard(pic_url)}
          >
            复制链接
          </button>
          {/* <button className="delete-history-button" onClick={handleDelete}>
            复制base64
          </button> */}
          <button className="delete-history-button" onClick={handleDelete}>
            点击删除
          </button>
        </div>
      </div>
    </div>
  );
}
