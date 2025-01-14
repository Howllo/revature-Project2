import { Box } from "@mui/material";
import { usePost } from "../component/Post/Context/UsePost.jsx";
import { useEffect } from "react";
import PostContainer from "../component/Post/DisplayPost/PostContainer.jsx";
import "./FeedPage.css";

const FeedPage = () => {
    const { listPostData, getPost} = usePost();

    useEffect(() => {
        getPost();
    }, []);

    if (!listPostData) return null;

    return (
        <Box className="FeedContainer">
            {listPostData.map((post) => (
                <Box key={post.id} sx={{mt: '-1px'}}>
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