import { Box, Card } from "@mui/material";
import UserAvatar from "../../AvatarComponent/UserAvatar.jsx";
import PostText from "../PostText.jsx";
import PostInformationText from "./PostInformationText.jsx";
import InteractionBar from "./InteractionBar.jsx";
import PropTypes from "prop-types";
import MediaContainer from "../MediaContainer.jsx";
import { useState } from "react";
import {useNavigate} from "react-router-dom";

const PostContainer = ({ key, post }) => {
  const [savedPost, setSavedPost] = useState(post);
  const navigate = useNavigate();

  const handleNavigation = (e) => {
      e.preventDefault();
      e.stopPropagation();

    if(e.target === e.currentTarget) {
      navigate(`/profile/${post.username}/post/${post.id}`);
    }
  }

  return (
    <Card
      elevation={0}
      sx={{
        mt: "-1px",
        borderRadius: "0px",
        display: "flex",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "rgb(212, 219, 226)",
        maxWidth: "650px",
        width: "90%",
        padding: "13px",
        cursor: "pointer",
      }}
      key={key}
      onClick={(e) => handleNavigation(e)}
    >
      <Box
        sx={{
          display: "flex",
          height: "100%",
          paddingRight: "5px",
        }}
        key={key}
      >
        <UserAvatar username={post.username} image={post.profilePic} />
      </Box>

      <Box
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        key={key}
      >
        <Box
          sx={{
            paddingTop: "10px",
            paddingBottom: "10px",
            maxHeight: "20%",
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <PostInformationText
            display_name={post.displayName ? post.displayName : post.username}
            username={post.username}
            post_date={post.postAt}
            post={post}
          />
        </Box>

        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "left",
            alignItems: "left",
          }}
        >
          <PostText comment={post.comment} />
        </Box>

        <Box
          sx={{
            width: "100%",
            height: "auto",
            display: "block",
            overflow: "hidden",
          }}
        >
          {post.media ? <MediaContainer media={post.media} /> : null}
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <InteractionBar
            post={savedPost}
            setPost={setSavedPost}
            commentsCount={post.commentCount}
            likesCount={post.likeCount}
          />
        </Box>
      </Box>
    </Card>
  );
};

PostContainer.propTypes = {
  key: PropTypes.string,
  post: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    username: PropTypes.string.isRequired,
    profile_pic: PropTypes.string,
    profilePic: PropTypes.string,
    displayName: PropTypes.string,
    postAt: PropTypes.string,
    comment: PropTypes.string.isRequired,
    commentCount: PropTypes.number,
    likeCount: PropTypes.number,
    media: PropTypes.string,
  }).isRequired,
};

export default PostContainer;
