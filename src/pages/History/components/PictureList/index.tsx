import { useEffect, useState } from "react";
import PictureItem from "../PictureItem";
import { getPicList } from "./utils/index";
import { NavLink } from "react-router-dom";
import { useLoginStore } from "../../../../zustand";

export default function PictureList() {
  const [pictureInfo, setPictureInfo] = useState<PicInfo[]>([]);
  const isLogged = useLoginStore((state) => state.isLogged);
  const queryList = () => {
    getPicList().then((result) => {
      setPictureInfo(result);
    });
  };
  useEffect(() => {
    queryList();
  }, []);
  const handleDelete = () => {
    queryList();
    // setPictureInfo();
  };
  return (
    <div>
      {isLogged ? (
        pictureInfo.map((item, index) => {
          return (
            <PictureItem
              key={index}
              pictureInfo={item}
              onDelete={handleDelete}
            />
          );
        })
      ) : (
        <div>
          <span>您还未登录</span>
          <NavLink to="/login">点击去登录</NavLink>
        </div>
      )}
    </div>
  );
}
