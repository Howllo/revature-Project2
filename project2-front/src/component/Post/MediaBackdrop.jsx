import {Backdrop, Box} from "@mui/material";
import MediaContainer from "./MediaContainer.jsx";

import PropTypes from 'prop-types';

const MediaBackdrop = ({media, open, handleClose}) => {
    return (
        <Box>
            <Backdrop
                open={open}
                onClick={handleClose}
                sx={{
                    zIndex: 9999,
                    backgroundColor: 'black'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <MediaContainer media={media}/>
                </Box>
            </Backdrop>
        </Box>
    )
}

MediaBackdrop.propTypes = {
    media: PropTypes.string.isRequired,
    handleClose: PropTypes.func,
    open: PropTypes.any.isRequired,
};

export default MediaBackdrop;