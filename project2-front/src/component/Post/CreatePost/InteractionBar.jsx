import {Box, Button, Typography} from "@mui/material";
import PropTypes from 'prop-types';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {useEffect, useState} from "react";
import {usePost} from "../Context/UsePost.jsx";
import CreatePost from "./CreatePost.jsx";

const InteractionBar = ({ post, setPost }) => {
    const [isLiked, setIsLiked] = useState(false)
    const {likePost, getLikes, isUserLike} = usePost();
    const [showCommentMenu, setShowCommentMenu] = useState()

    const handleLike = async () => {
        const liked = await likePost(post.id);
        setIsLiked(liked);
        const likes = await getLikes(post.id);
        setPost({
            ...post,
            likes: likes,
        });
    };

    useEffect(() => {
        const checkLikeStatus = async () => {
            const likeStatus = await isUserLike(post.id);
            setIsLiked(likeStatus);
        };
        checkLikeStatus();
    }, [post.likes, post.id, isUserLike]);

    const handleComments =  () => {
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
                    <Typography
                        variant="body1"
                        fontFamily="Inter, sans-serif"
                        sx={{
                            paddingLeft: '5px',
                            paddingTop: '2px',
                            flexDirection: 'row',
                            fontSize: '13.125px',
                            fontWeight: 400,
                            color: 'rgb(66, 87, 108)'
                        }}
                    >
                        {post.commentsNum}
                    </Typography>
                </Button>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',

                }}
            >
                <Button
                    onClick={handleLike}
                    sx={{
                        borderRadius: '20%',
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
                    <Typography
                        variant="h6"
                        fontFamily="Inter, sans-serif"
                        sx={{
                            paddingLeft: '5px',
                            paddingTop: '2px',
                            flexDirection: 'row',
                            fontSize: '13.125px',
                            color: 'rgb(66, 87, 108)'
                        }}
                    >
                        {post.likesNum}
                    </Typography>
                </Button>

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