import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from "@mui/material";
import {useState} from "react";
import {usePost} from "../Context/UsePost.jsx";

const EditPostDialog = ({open, setOpen, post}) => {
    const {editPost} = usePost();
    const [comment, setComment] = useState('');

    const handleClose = () => {
        setOpen(false);
    }

    const handleInputChange = () => {
        setOpen(false)
        setComment('')
    }

    const onSubmit = async () => {
        await editPost(post.id, comment, post.postAt);
        setOpen(false);
    }

    return (
        <Box>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        onSubmit();
                    },
                }}
            >
                <DialogTitle>Edit Comment</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please submit the new comment
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="text"
                        label="Enter comment"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(event) => setComment(event.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button disableRipple={true} onClick={() => handleInputChange()}>Cancel</Button>
                    <Button disableRipple={true} type="submit">Submit</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default EditPostDialog;