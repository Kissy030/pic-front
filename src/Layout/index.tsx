import { Outlet, NavLink } from "react-router-dom";
import { message } from "antd";
import {
  UploadOutlined,
  LoginOutlined,
  HistoryOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import "./index.less";
import { ACCESS_TOKEN } from "../pages/constants";
import { useLoginStore } from "../zustand";
export default function Layout() {
  // const [isLogged, setIsLogged] = useState(authLogin());
  // const { isLogged, loginSuccessHandler, logoutHandler } = useLoginStore();

  const isLogged = useLoginStore((state) => state.isLogged);
  const currentUser = useLoginStore((state) => state.currentUser);
  const setIsLogged = useLoginStore((state) => state.setIsLogged);
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "登出成功",
    });
  };

  return (
    <div className="navigate-content">
      <div className="navigate">
        <div className="navigate-group fake">
          <span className="button-upload">
            上传
            <UploadOutlined style={{ marginLeft: "5px" }} />
          </span>
          <span className="button-loging">
            登录
            <LoginOutlined style={{ marginLeft: "5px" }} />
          </span>
          <span className="button-history">
            历史
            <HistoryOutlined style={{ marginLeft: "5px" }} />
          </span>
          <span className="button-help">
            帮助
            <QuestionCircleOutlined style={{ marginLeft: "5px" }} />
          </span>
          {isLogged ? (
            <span className="username-text">欢迎您,{currentUser}</span>
          ) : (
            <span className="username-text"></span>
          )}
        </div>
        <h1 className="title">库里图床</h1>
        <div className="navigate-group">
          <span className="button-upload">
            <NavLink
              to="/home"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              上传
              <UploadOutlined style={{ marginLeft: "5px" }} />
            </NavLink>
          </span>

          <span className="button-history">
            <NavLink
              to="/history"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              历史
              <HistoryOutlined style={{ marginLeft: "5px" }} />
            </NavLink>
          </span>
          <span className="button-help">
            <NavLink
              to="/help"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              帮助
              <QuestionCircleOutlined style={{ marginLeft: "5px" }} />
            </NavLink>
          </span>
          <span className="button-loging">
            {contextHolder}
            {isLogged ? (
              <NavLink
                to="/login"
                onClick={() => {
                  sessionStorage.removeItem(ACCESS_TOKEN);
                  setIsLogged(false);
                  success();
                }}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                登出
                <LoginOutlined style={{ marginLeft: "5px" }} />
              </NavLink>
            ) : (
              <NavLink
                to="/login"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                登录
                <LoginOutlined style={{ marginLeft: "5px" }} />
              </NavLink>
            )}
          </span>
          {isLogged ? (
            <span className="username-text">欢迎您,{currentUser}</span>
          ) : (
            <span className="username-text"></span>
          )}
        </div>
      </div>
      <Outlet />
    </div>
  );
}
