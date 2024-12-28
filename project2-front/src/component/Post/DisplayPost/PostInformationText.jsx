import {Box, IconButton, Menu, Typography} from "@mui/material";
import PropTypes from 'prop-types';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuItem from "@mui/material/MenuItem";
import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import useAuth from "../../../util/auth/UseAuth.jsx";
import {usePost} from "../Context/UsePost.jsx";
import EditPostDialog from "./EditPostDialog.jsx";

const PostText = ({display_name, username, post_date, post}) => {
    const {user} = useAuth()
    const {deletePost} = usePost();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [handleDropdownMenu, setHandleDropdownMenu] = useState(false);
    const [openEditBox, setOpenEditBox] = useState(false);

    const daysBetween = () => {
        if (!post_date) return '0m';

        const date1 = new Date(post_date);
        const today = new Date();

        if (isNaN(date1.getTime())) return '0m';

        const diffMs = Math.max(0, today - date1);

        const minutes = Math.floor(diffMs / (1000 * 60));
        const hours = Math.floor(diffMs / (1000 * 60 * 60));
        const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const years = Math.floor(days / 365);

        if (minutes < 60) {
            return `${minutes}m`;
        } else if (hours < 24) {
            return `${hours}h`;
        } else if (days < 365) {
            return `${days}d`;
        } else {
            return `${years}y`;
        }
    };

    useEffect(() => {
        handleCheckIfAuthorized()
    }, [user]);

    const handleCheckIfAuthorized = () => {
        setHandleDropdownMenu(Cookies.get('user_id') === post.userId.toString())
    }
    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleDeletePost = async () => {
        await deletePost(post);
        handleClose();
    }

    const handleEditPost = () => {
        setOpenEditBox(true);
        handleClose();
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                width: '100%',
                flexDirection: 'row',
            }}
        >
            <Box>
                <Typography
                    variant="h6"
                    fontFamily="Inter, sans-serif"
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        fontSize: '15px',
                        wordWrap: 'break-word',
                        overflow: 'hidden',
                        color: 'rgb(11, 15, 20)'
                    }}
                >
                    {display_name}
                </Typography>
            </Box>

            <Box>
                <Typography
                    variant="h6"
                    fontFamily="Inter, sans-serif"
                    sx={{
                        paddingLeft: '5px',
                        paddingTop: '4px',
                        flexDirection: 'row',
                        fontSize: '12.125px',
                        wordWrap: 'break-word',
                        overflow: 'hidden',
                        color: 'rgb(66, 87, 108)'
                    }}
                >
                    @{username}
                </Typography>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                   paddingBottom: '0.5px'
                }}
            >
                <Typography
                    variant="h6"
                    fontFamily="Inter, sans-serif"
                    sx={{
                        display: 'flex',
                        paddingLeft: '5px',
                        paddingTop: '2px',
                        flexDirection: 'row',
                        fontSize: '15px',
                        wordWrap: 'break-word',
                        overflow: 'hidden',
                        color: 'rgb(66, 87, 108)'
                    }}
                >
                    ·
                </Typography>
            </Box>

            <Box>
                <Typography
                    variant="h6"
                    fontFamily="Inter, sans-serif"
                    sx={{
                        display: 'flex',
                        paddingLeft: '5px',
                        paddingTop: '3px',
                        flexDirection: 'row',
                        fontSize: '13.125px',
                        fontWeight: 600,
                        wordWrap: 'break-word',
                        overflow: 'hidden',
                        color: 'rgb(66, 87, 108)'
                    }}
                >
                    {daysBetween()}
                </Typography>
            </Box>

            {handleDropdownMenu ? <Box
                sx={{
                    display: 'flex',
                    alignSelf: 'flex-end',
                }}
            >
                <IconButton
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    <MoreVertIcon/>
                </IconButton>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={handleEditPost}>Edit</MenuItem>
                    <MenuItem onClick={handleDeletePost}>Delete</MenuItem>
                </Menu>
            </Box> : null}

            {openEditBox ? <EditPostDialog open={openEditBox} setOpen={setOpenEditBox} post={post}/> : null}
        </Box>
    )
}

PostText.propTypes = {
    display_name: PropTypes.string,
    username: PropTypes.string.isRequired,
    post_date: PropTypes.string,
};

export default PostText;