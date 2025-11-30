import { useEffect, useRef } from "react";
import "./index.less";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { sendEmail, addNewUser, authCode } from "./utils/index";
import {
  LoginOutlined,
  KeyOutlined,
  RightCircleFilled,
  EyeFilled,
  EyeInvisibleFilled,
} from "@ant-design/icons";
import { message } from "antd";
export default function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [code, SetCode] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const [countdown, setCountdown] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  // const sendVerificationCode = () => {
  //   setIsLoading(true);
  //   setTimeout(() => {
  //     setIsLoading(false);
  //     setCountdown(60);
  //     timerRef.current = setInterval(() => {
  //       setCountdown((prev) => {
  //         if (prev <= 1) {
  //           if (timerRef.current !== null) {
  //             clearInterval(timerRef.current);
  //             timerRef.current = null;
  //           }
  //           return 0;
  //         }
  //         return prev - 1;
  //       });
  //     }, 1000);
  //   }, 1000);
  // };

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const registerSuccessMessage = (message: string) => {
    messageApi.open({
      type: "success",
      content: `${message}`,
    });
  };
  const registerFailedMessage = (message: string) => {
    messageApi.open({
      type: "error",
      content: `${message}`,
    });
  };
  const inputErrorMessage = () => {
    messageApi.open({
      type: "error",
      content: "请输入您的完整信息",
    });
  };
  const handleTotle = async () => {
    if (email && username && password && confirmPassword && code) {
      const authCodeResult = await authCode(email, code);
      if (authCodeResult.statusCode === 200) {
        const registerResult = await addNewUser({
          username,
          password,
          confirmPassword,
          email,
        });
        if (registerResult.statusCode === 201) {
          registerSuccessMessage(registerResult.message);
          setTimeout(() => {
            navigate("/login");
          }, 500);
        } else registerFailedMessage(registerResult.message);
      } else registerFailedMessage(authCodeResult.message);
    } else inputErrorMessage();
  };
  const handleSendEmail = async () => {
    const sendEmailResult = await sendEmail({ to: email });
    if (sendEmailResult.success) {
      setTimeout(() => {
        setCountdown(60);
        timerRef.current = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              if (timerRef.current !== null) {
                clearInterval(timerRef.current);
                timerRef.current = null;
              }
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }, 1000);
      registerSuccessMessage(sendEmailResult.message);
    } else {
      registerFailedMessage("发送失败，请检查您的邮箱");
    }
  };
  return (
    <div className="login-content">
      <h1 className="login-title">注册你的账户</h1>
      <div className="fake dont-have-account">
        <div className="dont-have-account-text">没有帐户?</div>

        <NavLink to="/signup" className="signup">
          <KeyOutlined />
          注册
        </NavLink>
      </div>
      <div className="dont-have-account"></div>
      <div className="login-input">
        <div>
          <input
            className="input-box login-password"
            type="text"
            placeholder="电子邮箱"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="fake code">
            {showPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
          </button>
        </div>

        <div>
          <input
            className="input-box login-username"
            type="text"
            placeholder="用户名"
            onChange={(e) => setUsername(e.target.value)}
          />
          <button className="fake code">
            {showPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
          </button>
        </div>

        <div>
          <input
            className="input-box login-password"
            type={showPassword ? "text" : "password"}
            placeholder="密码"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="toggle-password-visibility-button code"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
          </button>
        </div>
        <div>
          <input
            className="input-box login-password"
            type={showPassword ? "text" : "password"}
            placeholder="确认密码"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            className="toggle-password-visibility-button code"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
          </button>
        </div>
        <div className="code-box">
          <input
            className="input-box login-password code-input"
            type="text"
            onChange={(e) => SetCode(e.target.value)}
            placeholder="验证码"
          />
          <button
            disabled={countdown > 0}
            className="sendCode-button code"
            onClick={handleSendEmail}
          >
            {countdown > 0 ? `${countdown}秒后重新获取` : "获取验证码"}
          </button>
        </div>

        {/* <NavLink to="/login" state={email}> */}
        <>{contextHolder}</>
        <div className="login-button-box">
          <RightCircleFilled className="login-button" onClick={handleTotle} />
        </div>

        {/* </NavLink> */}
      </div>

      <NavLink to="/login" className="forget-password">
        <LoginOutlined className="forget-password-icon" />
        返回登录
      </NavLink>
    </div>
  );
}
