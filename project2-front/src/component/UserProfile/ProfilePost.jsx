﻿import {Box} from "@mui/material";
import { usePost } from "../Post/Context/UsePost.jsx";
import { useEffect, useState } from "react";
import PostContainer from "../Post/DisplayPost/PostContainer.jsx";
import {useUserProfile} from "./Context/UseUserProfile.jsx";
import PropTypes from "prop-types";

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
                        maxWidth: "100%",
                        width: "100%",
                        display: 'flex',
                        flexDirection: 'column',
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

ProfilePost.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
    }).isRequired,
};

export default ProfilePost;