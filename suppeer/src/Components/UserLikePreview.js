import { Avatar, AvatarGroup, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import HorizontalStack from "./util/HorizontalStack";
import { AiFillLike } from "react-icons/ai";
import UserLikeModal from "./UserLikeModal";
import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/micah';

const UserLikePreview = ({ postId, userLikePreview }) => {
  const [open, setOpen] = useState(false);

  const generateAvatarUri = (username) => {
    const svg = createAvatar(style, {
      seed: username,
    });
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  };

  const handleClick = (event) => {
    event.stopPropagation();
    setOpen(true);
  };

  let userLikes;
  if (userLikePreview) {
    userLikes = userLikePreview.slice(0, 3);
  }

  return (
    userLikes && (
      <>
        <Button
          variant="outlined"
          size="small"
          startIcon={<AiFillLike />}
          color="primary"
          onClick={handleClick}
        >
          <HorizontalStack>
            <AvatarGroup>
              {userLikes &&
                userLikes.map((userLike) => (
                    <Avatar
                    src={generateAvatarUri(userLike.username)}
                    sx={{ backgroundColor: "lightgray", width: 30, height: 30 }}
                    key={userLike._id}
                    alt={`Avatar for ${userLike.username}`}
                    />
                ))}
            </AvatarGroup>
          </HorizontalStack>
        </Button>
        {open && (
          <UserLikeModal open={open} setOpen={setOpen} postId={postId} />
        )}
      </>
    )
  );
};

export default UserLikePreview;
