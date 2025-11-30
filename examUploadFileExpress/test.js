const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 3000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// 配置 multer 中间件
const upload = multer({
  dest: "uploads/", // 临时存储目录
  limits: {
    fileSize: 10 * 1024 * 1024, // 限制文件大小为10MB
  },
});

// 处理文件上传的接口
app.post("/api/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  // 获取上传的文件信息
  const { originalname, mimetype, size, path: tempPath } = req.file;

  // 这里可以处理 Blob 数据，例如：
  // 1. 读取文件内容
  const fileContent = fs.readFileSync(tempPath);
  // 返回响应
  res.send({
    message: "File uploaded successfully",
    originalName: originalname,
    mimeType: mimetype,
    size: size,
    path: tempPath,
  });
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
