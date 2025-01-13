import { Box } from "@mui/material";
import { usePost } from "../component/Post/Context/UsePost.jsx";
import { useEffect } from "react";
import PostContainer from "../component/Post/DisplayPost/PostContainer.jsx";

const FeedPage = () => {
    const { listPostData, getPost} = usePost();

    useEffect(() => {
        getPost();
    }, []);

    if (!listPostData) return null;

    return (
        <Box
            sx={{
                maxWidth: "650px",
                width: "100%",
                height: "auto",
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {listPostData.map((post) => (
                <Box key={post.id}>
                    <PostContainer
                        post={post}
                        isComment={false}
                    />
                </Box>
            ))}
        </Box>
    );
};

export default FeedPage;