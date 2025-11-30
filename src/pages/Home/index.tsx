import React from "react";
import { Button, message } from "antd";
import "./index.less";
import { useRef, useState, useCallback } from "react";
import { put } from "./utils/put";
import { addNewPic } from "./utils";
export default function Home() {
  const [isDragging, setIsDragging] = useState(false);
  const [currentPicBase64, setCurrentPicBase64] = useState("");
  const [currentPicURL, setCurrentPicURL] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [messageApi, contextHolder] = message.useMessage();
  const reader = new FileReader();
  const upLoadSuccessMessage = () => {
    messageApi.open({
      type: "success",
      content: "上传成功",
    });
  };
  const handleSuccessMessage = (handleType: string) => {
    messageApi.open({
      type: "success",
      content: `${handleType}成功`,
    });
  };
  const uploadFile = async (file: File) => {
    //@ts-ignore

    const fileInfo = await put(file, file.name);

    if (fileInfo) {
      upLoadSuccessMessage();
      return {
        pic_name: fileInfo.picName,
        pic_url: fileInfo.picUrl,
        pic_message: fileInfo.picMessage,
        // pic_base64: currentPicBase64,
      };
    }
  };
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (!e.dataTransfer.files || e.dataTransfer.files.length === 0) return;

    const file = e.dataTransfer.files[0];
    const picInfo = await uploadFile(file);
    if (picInfo) {
      addNewPic(picInfo);
      setCurrentPicURL(picInfo.pic_url);
    }
    reader.onload = () => {
      const result = reader.result as string;
      setCurrentPicBase64(result);
    };

    // 开始读取文件为 Data URL（Base64 格式）
    reader.readAsDataURL(file);
    // try {
    //   const file = e.dataTransfer.files[0];
    //   console.log(file);
    //   const picInfo = await uploadFile(file);
    //   addNewPic(picInfo);
    //   message.success("上传成功");
    // }
    //  catch (error) {
    //   console.error("拖拽上传失败:", error);
    // }
  };
  const handlePaste = useCallback(async (e: React.ClipboardEvent) => {
    if (!e.clipboardData.files || e.clipboardData.files.length === 0) return;
    try {
      const file = e.clipboardData.files[0];
      const picInfo = await uploadFile(file);
      if (picInfo) {
        addNewPic(picInfo);
        setCurrentPicURL(picInfo.pic_url);
      }
      reader.onload = () => {
        const result = reader.result as string;
        setCurrentPicBase64(result);
      };

      // 开始读取文件为 Data URL（Base64 格式）
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("粘贴上传失败:", error);
    }
  }, []);

  const handleCopyToClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      handleSuccessMessage("复制");
    } catch (error) {
      console.log(error);
    }
  };
  const handleCopyUrl = () => {
    handleCopyToClipBoard(currentPicURL);
  };
  const handleConvertToBase64 = () => {
    // const encoder = new TextEncoder();
    // const data = encoder.encode(URLRef.current!.value);
    // const base64 = btoa(String.fromCharCode(...data));

    handleCopyToClipBoard(currentPicBase64);
  };

  return (
    <div
      className={`home-content ${isDragging ? "dragging" : ""}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onPaste={handlePaste}
    >
      <h1 className="home-title">上传你的照片</h1>
      <p className="home-text">
        将图片拖拽到此处或 Ctrl+V 上传，最大支持 10 MB
      </p>
      <input
        type="file"
        className="upload-file"
        ref={inputRef}
        onInput={async (e) => {
          const target = e.target as HTMLInputElement;
          const file = target.files?.[0];
          if (!file) return;
          if (!file.type.startsWith("image/")) {
            alert("请上传图片文件");
            return;
          }

          reader.onload = () => {
            const result = reader.result as string;
            setCurrentPicBase64(result);
          };
          reader.readAsDataURL(file);

          const picInfo = await uploadFile(file);
          if (picInfo !== undefined) {
            addNewPic(picInfo);
            setCurrentPicURL(picInfo.pic_url);
          }

          target.value = "";
        }}
      />
      <>{contextHolder}</>
      <Button
        className="start-upload"
        type="primary"
        onClick={() => {
          if (!inputRef.current) return;
          inputRef.current.click();
        }}
      >
        开始上传
      </Button>
      {isDragging && (
        <div className="drag-overlay">
          <div className="drag-hint">松开鼠标上传文件</div>
        </div>
      )}

      <div
        className="showURLArea"
        onClick={() => {
          if (currentPicBase64 || !inputRef.current) {
            return;
          }
          inputRef.current.click();
        }}
      >
        {currentPicBase64 ? (
          <img
            style={{ userSelect: "none", borderRadius: "20px" }}
            src={currentPicBase64}
            width="100%"
            height="500px"
            alt=""
          />
        ) : (
          <p className="uploadContentArea">请上传图片</p>
        )}
      </div>
      <>{contextHolder}</>
      {currentPicBase64 && (
        <div className="url-handle-button">
          <button className="url-copy-button" onClick={handleCopyUrl}>
            点击复制链接
          </button>
          <button className="url-base64-button" onClick={handleConvertToBase64}>
            点击复制base64
          </button>
        </div>
      )}
    </div>
  );
}
