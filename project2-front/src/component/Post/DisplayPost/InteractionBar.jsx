import {Box, Button, Typography} from "@mui/material";
import PropTypes from 'prop-types';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {useEffect, useState} from "react";
import {usePost} from "../Context/UsePost.jsx";
import CreatePost from "../CreatePost/CreatePost.jsx";
import PostDialog from "./PostDialog.jsx";
import Cookies from "js-cookie";
import useAuth from "../../../util/auth/UseAuth.jsx";

const InteractionBar = ({ post, setPost, commentsCount, likesCount }) => {
    const {user} = useAuth()
    const [showCommentMenu, setShowCommentMenu] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [currentLikes, setCurrentLikes] = useState(likesCount);
    const {likePost, isUserLike } = usePost();
    const [handleDropdownMenu, setHandleDropdownMenu] = useState(false);

    const handleLike = async () => {
        const liked = await likePost(post.id);

        if(!liked) {
            setIsLiked(false);
            return;
        }

        let newLikeTotal = likesCount + 1;
        setCurrentLikes(newLikeTotal);
        setIsLiked(liked);
        setPost({
            ...post,
            likeCount: newLikeTotal,
            commentCount: commentsCount,
        });
    };

    useEffect(() => {
        handleCheckIfAuthorized()
    }, [user]);

    const handleCheckIfAuthorized = () => {
        setHandleDropdownMenu(Cookies.get('user_id') === post.userId.toString())
    }

    useEffect(() => {
        const checkLikeStatus = async () => {
            const likeStatus = await isUserLike(post.id);
            setIsLiked(likeStatus);
        };
        checkLikeStatus();
    }, [post.id, isUserLike]);

    const handleComments = async () => {
        setShowCommentMenu(true)
    }

    return (
        <Box
            sx={{
                marginTop: '5px',
                display: 'flex',
                flexDirection: 'row',
                height: 'auto',
                width: '100%',
                justifyContent: 'space-evenly',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                }}
            >
                <Button
                    disableRipple={true}
                    sx={{
                        borderRadius: '50px',
                        alignItems: 'center',
                    }}
                    onClick={handleComments}
                >
                    <ChatBubbleOutlineIcon
                        sx={{
                            color: 'rgb(66, 87, 108)',
                            height: '20px',
                            width: '20px',
                        }}
                    />
                    <Typography
                        variant="body1"
                        fontFamily="Inter, sans-serif"
                        sx={{
                            paddingLeft: '5px',
                            flexDirection: 'row',
                            fontSize: '13.125px',
                            fontWeight: 400,
                            color: 'rgb(66, 87, 108)'
                        }}
                    >
                        {commentsCount}
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
                                    color: 'rgb(255,68,91)',
                                    height: '20px',
                                    width: '20px',
                                }}
                            />
                            :
                            <FavoriteBorder
                            sx={{
                                color: 'rgb(66, 87, 108)',
                                height: '20px',
                                width: '20px',
                            }}
                        />
                    }
                    <Typography
                        variant="h6"
                        fontFamily="Inter, sans-serif"
                        sx={{
                            paddingLeft: '5px',
                            flexDirection: 'row',
                            fontSize: '13.125px',
                            color: 'rgb(66, 87, 108)'
                        }}
                    >
                        {currentLikes}
                    </Typography>
                </Button>
                {showCommentMenu ? <CreatePost handleOpen={setShowCommentMenu} child={post}/> : null }
            </Box>

            {handleDropdownMenu ? <PostDialog post={post}/> : null }
        </Box>
    )
}

InteractionBar.propTypes = {
    post: PropTypes.object.isRequired,
    setPost: PropTypes.func.isRequired,
    commentsCount: PropTypes.number.isRequired,
    likesCount: PropTypes.number.isRequired,
};

export default InteractionBar;