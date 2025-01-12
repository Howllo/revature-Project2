import {Box, IconButton, Menu} from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import {usePost} from "../Context/UsePost.jsx";
import PropTypes from "prop-types";
import EditPostDialog from "./EditPostDialog.jsx";

const PostDialog = ({post}) => {
    const {deletePost} = usePost();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [openEditBox, setOpenEditBox] = useState(false);

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
                display: "flex"
            }}
        >
             <Box
                sx={{
                    display: 'flex',
                }}
            >
                <IconButton
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    <MoreHorizIcon/>
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
            </Box>

            {openEditBox ? <EditPostDialog open={openEditBox} setOpen={setOpenEditBox} post={post}/> : null}
        </Box>
    )
}

PostDialog.propTypes = {
    post: PropTypes.object,
};

export default PostDialog;