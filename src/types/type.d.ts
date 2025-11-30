interface MailInfo {
  to: string;
  subject?: string;
  text?: string;
  html?: string;
}

interface UserInfo {
  id?: number;
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
}

interface PicInfo {
  pic_id?: number;
  pic_name: string;
  pic_url: string;
  // pic_base64: string;
}
