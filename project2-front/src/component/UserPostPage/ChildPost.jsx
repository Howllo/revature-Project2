import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import PostContainer from "../Post/DisplayPost/PostContainer.jsx";
import { usePost } from "../Post/Context/UsePost.jsx";
import PropTypes from "prop-types";

const ChildPostPage = ({ parentId }) => {
  const [listChildPost, setListChildPost] = useState([]);
  const { getChildren } = usePost();

  useEffect(() => {
    const getAllComments = async () => {
      if (!parentId) return;
      const timer = setTimeout(async () => {
        const comments = await getChildren(parentId);
        setListChildPost(comments);
      }, 300);
      return () => clearTimeout(timer);
    };
    getAllComments();
  }, [parentId, getChildren]);

  return (
    <Box
      sx={{
        height: "auto",
        display: "flex",
        flexDirection: "column",
        width: "100.2%",
        alignItems: "center",
      }}
    >
      {listChildPost.length > 0 &&
        listChildPost.map((post) => (
          <Box
            key={post.id}
            sx={{
              display: 'flex',
              width: '99.50%',
              alignItems: "center"
            }}>
              <PostContainer post={post} />
          </Box>
        ))}
    </Box>
  );
};

ChildPostPage.propTypes = {
  parentId: PropTypes.number.isRequired,
};

export default ChildPostPage;