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
import PropTypes from "prop-types";
import {PostProvider} from "../Context/PostProvider.jsx";

const YouTubeDialog = ({setMedia, handleClose, open }) => {
    const [linked, setLinked] = useState("")

    const handleInputChange = () => {
        setMedia(linked)
        handleClose(false)
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
                        handleInputChange();
                    },
                }}
            >
                <DialogTitle>YouTube Video</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter the URL of the Youtube vide you wish to submit.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="text"
                        label="Enter YouTube URL"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(event) => {setLinked(event.target.value)}}
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

YouTubeDialog.propTypes = {
    setMedia: PropTypes.func,
    handleClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

export default YouTubeDialog;