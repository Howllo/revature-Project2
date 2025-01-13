import {Box} from "@mui/material";
import PostBackBar from "../component/UserPostPage/PostBackBar.jsx";
import ParentPost from "../component/UserPostPage/ParentPost.jsx";
import {useState} from "react";

const PostPage = () => {
  const [post, setPost] = useState({});

  return (
    <Box
      sx={{

      }}
    >
      <PostBackBar />

      <Box>
        <ParentPost setPostParent={setPost} />
      </Box>
    </Box>
  )
}

export default PostPage;