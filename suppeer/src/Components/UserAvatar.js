import { Avatar as MUIAvatar} from "@mui/material";
import React from "react";
import { createAvatar } from '@dicebear/core';
import * as style from '@dicebear/micah';

const generateAvatarUri = (username) => {
  const svg = createAvatar(style, {
    seed: username,
  });
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

//display user avatar
const UserAvatar = ({ username, height = 40, width = 40 }) => {
  // Generate avatar URI from username
  const avatarUri = generateAvatarUri(username);
  return (
    <MUIAvatar
      style={{
        height: height,
        width: width,
        backgroundColor: "lightgray",
      }}
      src={avatarUri}
      alt={`Avatar for ${username}`}
    />
  );
};

export default UserAvatar;
