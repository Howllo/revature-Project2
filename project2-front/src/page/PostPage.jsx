import {Box} from "@mui/material";
import PostBackBar from "../component/UserPostPage/PostBackBar.jsx";
import ParentPost from "../component/UserPostPage/ParentPost.jsx";
import {useEffect, useState} from "react";
import ChildPost from "../component/UserPostPage/ChildPost.jsx";
import {useParams} from "react-router-dom";

const PostPage = () => {
  const [post, setPost] = useState({});
  const { postId } = useParams();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <PostBackBar />
      <ParentPost setPostParent={setPost} />
      {post && <ChildPost parentId={postId} />}
    </Box>
  )
}

export default PostPage;