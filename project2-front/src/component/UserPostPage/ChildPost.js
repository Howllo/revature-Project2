import {useEffect, useState} from "react";
import {Box} from "@mui/material";
import PostContainer from "../Post/DisplayPost/PostContainer.jsx";
import {usePostPage} from "./Context/UsePostPage.jsx";

const ChildPostPage = ({parentId}) => {
  const [postComments, setPostComments] = useState({});
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const {listPostData, getChildren} = usePostPage();

  const renderComments = (postId) => {
    const comments = postComments[postId] || [];
    if (!comments.length) return null;

    return comments.map(comment => (
      <Box
        key={comment.id}
        sx={{
          width: '100%',
        }}
      >
        <PostContainer
          post={comment}
          isComment={true}
          commentChildren={renderComments(comment.id)}
        />
      </Box>
    ));
  };

  useEffect(() => {
    const loadComments = async () => {
      if (!listPostData) return;
      setIsLoadingComments(true);
      try {
        const commentsPromises = listPostData.map(async (post) => {
          const comments = await getChildren(post.id);
          return { postId: post.id, comments };
        });

        const results = await Promise.all(commentsPromises);
        const commentsMap = {};
        results.forEach(({ postId, comments }) => {
          if (comments && Array.isArray(comments)) {
            commentsMap[postId] = comments;
          }
        });

        setPostComments(commentsMap);
      } catch (error) {
        console.error("Error loading comments:", error);
      } finally {
        setIsLoadingComments(false);
      }
    };

    loadComments();
  }, [listPostData]);

  return (
    renderComments(parentId)
  )
}

export default ChildPostPage;