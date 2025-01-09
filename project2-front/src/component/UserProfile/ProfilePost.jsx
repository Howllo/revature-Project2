import {Box} from "@mui/material";
import { usePost } from "../Post/Context/UsePost.jsx";
import { useEffect, useState } from "react";
import PostContainer from "../Post/DisplayPost/PostContainer.jsx";
import {useUserProfile} from "./Context/UseUserProfile.jsx";

const ProfilePost = ({user}) => {
    
    const {getId} = useUserProfile();
    const { listPostData, getUserPost, getChildren } = usePost();
    const [postComments, setPostComments] = useState({});
    const [isLoadingComments, setIsLoadingComments] = useState(false);
        
        useEffect(() => {
            const x = getId(user.username)
            x.then(value => {
                getUserPost(value)
            })
        }, [user]);
    
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
            }, [listPostData, getChildren, user]);
        
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
                        maxWidth: "104.7%",
                        width: "104.7%",
                        display: 'flex',
                        flexDirection: 'column',
                        
                        marginLeft: '-1px'
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
}

export default ProfilePost;