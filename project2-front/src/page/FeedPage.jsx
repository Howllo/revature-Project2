import { Box } from "@mui/material";
import { usePost } from "../component/Post/Context/UsePost.jsx";
import { useEffect, useState } from "react";
import PostContainer from "../component/Post/DisplayPost/PostContainer.jsx";

const FeedPage = () => {
    const { listPostData, getPost, getChildren } = usePost();
    const [postComments, setPostComments] = useState({});
    const [isLoadingComments, setIsLoadingComments] = useState(false);

    useEffect(() => {
        getPost();
    }, []);

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
    }, [listPostData, getChildren]);

    const renderComments = (postId) => {
        const comments = postComments[postId] || [];
        if (!comments.length) return null;

        return comments.map(comment => (
            <Box
                key={comment.id}
                sx={{
                    width: '100%',
                    pl: 4,
                    borderLeft: '2px solid #f0f0f0',
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

    if (!listPostData) return null;

    return (
        <Box
            sx={{
                maxWidth: "85%",
                width: "100%",
                display: 'flex',
                flexDirection: 'column',
                gap: 2
            }}
        >
            {listPostData.map((post) => (
                <Box key={post.id}>
                    <PostContainer
                        post={post}
                        isComment={false}
                        commentChildren={!isLoadingComments && renderComments(post.id)}
                    />
                </Box>
            ))}
        </Box>
    );
};

export default FeedPage;