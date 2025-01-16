import PostContainer from "../Post/DisplayPost/PostContainer.jsx";
import {Box} from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {usePost} from "../Post/Context/UsePost.jsx";

const ParentPost = ({ setPostParent }) => {
  const [post, setPost] = useState({});
  const { postId } = useParams();
  const {getPostUnique} = usePost();



  useEffect(() => {
    const getPostAsync = async () => {
      const getPost = await getPostUnique(postId);
      setPost(getPost);
      setPostParent(getPost);
      document.title = `${getPost.displayName || getPost.username}: ${getPost.comment || 'Media'} - DevSky`;
    }
    getPostAsync();
  }, [postId]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "597px",
        alignItems: "center",
        mt: '-1px',
      }}
    >
      {post.id ? <PostContainer post={post} isPostProfile={true}/> : null}
    </Box>
  )
}

ParentPost.propTypes = {
  setPostParent: PropTypes.func,
};

export default ParentPost;