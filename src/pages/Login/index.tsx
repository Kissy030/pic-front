import "./index.less";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import {
  PlusCircleFilled,
  RightCircleFilled,
  EyeFilled,
  EyeInvisibleFilled,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { signIn } from "./utils";
import { useLoginStore } from "../../zustand";
import { message } from "antd";
export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const setIsLogged = useLoginStore((state) => state.setIsLogged);
  const setCurrentUser = useLoginStore((state) => state.setCurrentUser);
  const [messageApi, contextHolder] = message.useMessage();
  const loginSuccessMessage = () => {
    messageApi.open({
      type: "success",
      content: "登录成功",
    });
  };
  const loginFailedMessage = (message: string) => {
    messageApi.open({
      type: "error",
      content: `${message}`,
    });
  };
  const inputErrorMessage = () => {
    messageApi.open({
      type: "error",
      content: "请输入用户名或密码",
    });
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const authLoginInfo = async () => {
    if (username && password) {
      const loginBack = await signIn(username, password);
      if (loginBack.token) {
        loginSuccessMessage();
        setIsLogged(true);
        setCurrentUser(loginBack.backUser.username);
        setTimeout(() => {
          navigate("/home");
        }, 500);
      } else {
        loginFailedMessage(loginBack.message);
      }
    } else inputErrorMessage();
  };

  return (
    <div className="login-content">
      <h1 className="login-title">登录你的账户</h1>
      <div className="dont-have-account">
        <div className="dont-have-account-text">没有帐户?</div>

        <NavLink to="/signup" className="signup">
          <PlusCircleFilled />
          注册
        </NavLink>
      </div>

      <div className="login-input">
        <div>
          <input
            className="input-box login-username"
            type="text"
            placeholder="用户名"
            onChange={(e) => setUsername(e.target.value)}
          />
          <button className="fake" onClick={togglePasswordVisibility}>
            {showPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
          </button>
        </div>

        <div className="passowrd-box">
          <input
            className="input-box login-password"
            type={showPassword ? "text" : "password"}
            placeholder="密码"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="toggle-password-visibility-button"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
          </button>
        </div>
        <div className="fake">
          <input
            className="input-box login-password"
            type={showPassword ? "text" : "password"}
            placeholder="确认密码"
          />
          <button
            className="toggle-password-visibility-button"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
          </button>
        </div>
        <>
          {contextHolder}
          <RightCircleFilled className="login-button" onClick={authLoginInfo} />
        </>
      </div>
      {/* <NavLink to="/forgetPassword" className="forget-password">
        <KeyOutlined className="forget-password-icon" />
        忘记密码?
      </NavLink> */}
    </div>
  );
}
