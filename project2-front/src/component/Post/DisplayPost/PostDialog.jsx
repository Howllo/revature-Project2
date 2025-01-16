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
      event.stopPropagation();
      setAnchorEl(event.currentTarget);
    };

    const handleDeletePost = async (e) => {
      e.preventDefault();
      e.stopPropagation();
      await deletePost(post);
      handleClose(e);
    }

    const handleEditPost = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setOpenEditBox(true);
      handleClose(e);
    }

    const handleClose = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setAnchorEl(null);
    };

    return (
        <Box
          onClick={(e) => e.stopPropagation()}
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
                    onClick={(e) => handleClick(e)}
                >
                    <MoreHorizIcon/>
                </IconButton>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={(e) => handleClose(e)}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={(e) => handleEditPost(e)}>Edit</MenuItem>
                    <MenuItem onClick={(e) => handleDeletePost(e)}>Delete</MenuItem>
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