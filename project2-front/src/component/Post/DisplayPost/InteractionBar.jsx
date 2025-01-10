﻿import {Box, Button, Typography} from "@mui/material";
import PropTypes from 'prop-types';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {useEffect, useState} from "react";
import {usePost} from "../Context/UsePost.jsx";
import CreatePost from "../CreatePost/CreatePost.jsx";

const InteractionBar = ({ post, setPost }) => {
    const [isLiked, setIsLiked] = useState(false)
    const {likePost, getLikes, isUserLike, getCommentTotal} = usePost();
    const [showCommentMenu, setShowCommentMenu] = useState()

    const handleLike = async () => {
        const liked = await likePost(post.id);
        setIsLiked(liked);
        const likes = await getLikes(post.id);
        const commentsNum = await getCommentTotal(post.id);
        setPost({
            ...post,
            likes: likes,
            commentsNum: commentsNum,
        });
    };

    useEffect(() => {
        const checkLikeStatus = async () => {
            const likeStatus = await isUserLike(post.id);
            setIsLiked(likeStatus);
        };
        checkLikeStatus();

        const setInitialLikesAndComments = async () => {
            const likes = await getLikes(post.id);
            const commentsNum = await getCommentTotal(post.id);
            setPost({
                ...post,
                likes: likes,
                commentsNum: commentsNum,
            });
        }
        setInitialLikesAndComments();


    }, [post.likes, post.id, isUserLike]);

    const handleComments = async () => {
        setShowCommentMenu(true)
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                height: '100%',
                width: '100%',
                justifyContent: 'space-between',
            }}
        >
            <Box>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                }}
            >
                <Button
                    disableRipple={true}
                    sx={{
                        borderRadius: '20%',
                        alignItems: 'center',
                    }}
                    onClick={handleComments}
                >
                    <ChatBubbleOutlineIcon
                        sx={{
                            color: 'rgb(66, 87, 108)'
                        }}
                    />
                </Button>

                <Typography
                    variant="body1"
                    fontFamily="Inter, sans-serif"
                    sx={{
                        paddingLeft: '2px',
                        paddingTop: '8px',
                        flexDirection: 'row',
                        fontSize: '13.125px',
                        fontWeight: 400,
                        color: 'rgb(66, 87, 108)'
                    }}
                >
                    {post.commentsNum}
                </Typography>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',

                }}
            >

                <Button
                    disableRipple={true}
                    onClick={handleLike}
                    sx={{
                        borderRadius: '50px',
                        width: '30%',
                        alignItems: 'center',
                    }}
                >
                    {
                        isLiked
                        ?
                            <FavoriteIcon
                                sx={{
                                    color: 'rgb(255,68,91)'
                                }}
                            />
                            :
                            <FavoriteBorder
                            sx={{
                                color: 'rgb(66, 87, 108)'
                            }}
                        />
                    }
                </Button>

                <Typography
                    variant="h6"
                    fontFamily="Inter, sans-serif"
                    sx={{
                        paddingLeft: '2px',
                        paddingTop: '8px',
                        flexDirection: 'row',
                        fontSize: '13.125px',
                        color: 'rgb(66, 87, 108)'
                    }}
                >
                    {post.likes}
                </Typography>

                {showCommentMenu ? <CreatePost handleOpen={setShowCommentMenu} child={post}/> : null }
            </Box>
            <Box>
            </Box>
        </Box>
    )
}

InteractionBar.propTypes = {
    post: PropTypes.object.isRequired,
    setPost: PropTypes.func.isRequired,
};

export default InteractionBar;