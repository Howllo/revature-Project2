import { Box, Card } from "@mui/material";
import UserAvatar from "../../AvatarComponent/UserAvatar.jsx";
import PostText from "../PostText.jsx";
import PostInformationText from "./PostInformationText.jsx";
import InteractionBar from "./InteractionBar.jsx";
import PropTypes from "prop-types";
import MediaContainer from "../MediaContainer.jsx";
import { useState } from "react";
import "./PostContainer.css"
import {useNavigate} from "react-router-dom";

const PostContainer = ({ key, post, isPostProfile = false }) => {
  const [savedPost, setSavedPost] = useState(post);
  const navigate = useNavigate();

  const handleNavigation = (e) => {
    if(isPostProfile) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();

    if(e.target === e.currentTarget) {
      navigate(`/profile/${post.username}/post/${post.id}`);
    }
  }

  return (
    <Card className="PostContainerCard" elevation={0} key={key} onClick={(e) => handleNavigation(e)}>
      <Box
        onClick={(e) => handleNavigation(e)}
        sx={{
          display: "flex",
          height: "100%",
          paddingRight: "5px",
        }}
        key={key}
      >
        <UserAvatar username={post.username} image={post.profile} />
      </Box>

      <Box
        onClick={(e) => handleNavigation(e)}
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
              marginBottom: '2%',
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
    profile: PropTypes.string,
    displayName: PropTypes.string,
    postAt: PropTypes.string,
    comment: PropTypes.string.isRequired,
    commentCount: PropTypes.number,
    likeCount: PropTypes.number,
    media: PropTypes.string,
  }).isRequired,
  isPostProfile: PropTypes.bool,
};

export default PostContainer;
