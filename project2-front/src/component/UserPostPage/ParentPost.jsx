import PostContainer from "../Post/DisplayPost/PostContainer.jsx";
import {Box} from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {usePost} from "../Post/Context/UsePost.jsx";

const ParentPost = ({ setPostParent }) => {
  const [post, setPost] = useState({});
  const { postId } = useParams();
  const {getPost} = usePost();

  useEffect(() => {
    const getPostAsync = async () => {
      setPost(await getPost(Number(postId)));
      setPostParent(post);
    }
    getPostAsync();
  }, postId);

  return (
    <Box>
      <PostContainer post={post} />
    </Box>
  )
}

ParentPost.propTypes = {
  setPostParent: PropTypes.func,
};

export default ParentPost;