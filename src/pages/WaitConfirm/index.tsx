import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { RightCircleFilled } from "@ant-design/icons";
import "./index.less";
import { sendEmail } from "../SignUp/utils";
import { useLoginStore } from "../../zustand";
import { authCode } from "./utils";

export default function WaitConfirm() {
  const location = useLocation();
  const [code, SetCode] = useState("");
  const currentEmail = useLoginStore((state) => state.currentEmail);
  return (
    <div className="login-content">
      <h1 className="login-title">你的账户快搞定了</h1>
      <p className="confirm-text">
        已向{location.state}
        发送了一封电子邮件。如果你没有收到，请确认邮箱地址没有打错，并检查你的垃圾邮件，或者换个邮箱试试。
      </p>
      <div className="login-input">
        <div>
          <input
            className="input-box login-password"
            type="text"
            onChange={(e) => SetCode(e.target.value)}
            placeholder="验证码"
          />
          <button
            onClick={() => {
              sendEmail({ to: currentEmail });
            }}
          >
            发送验证码
          </button>
        </div>
        <NavLink to="/waitConfirm">
          <RightCircleFilled
            className="login-button"
            onClick={() => {
              authCode(currentEmail, code);
            }}
          />
        </NavLink>
      </div>
    </div>
  );
}
