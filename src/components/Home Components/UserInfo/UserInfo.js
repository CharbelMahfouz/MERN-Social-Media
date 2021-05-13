import React from "react";
import { Avatar } from "@material-ui/core";
import "./UserInfo.css";

const UserInfo = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <div className="user-info__container">
      <div className="user_info">
        <Avatar
          alt={user.name}
          src={user.profileImg}
          className="user__info-icon"
        />
        <div className="user__info">
          <p className="user__info-name">{user.name}</p>
          <p className="user__info-email">{user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
