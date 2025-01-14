import {Backdrop, Box} from "@mui/material";
import MediaContainer from "./MediaContainer.jsx";

import PropTypes from 'prop-types';

const MediaBackdrop = ({media, open, handleClose}) => {
  const handleBackdropClick = (e) => {
    e.stopPropagation();
    handleClose();
  };

  return (
    <Box>
        <Backdrop
            open={open}
            onClick={handleBackdropClick}
            sx={{
              zIndex: 9999,
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
              cursor: 'default'
            }}
        >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                maxHeight: '90vh',
                maxWidth: '90vw',
                cursor: 'default'
              }}
            >
                <MediaContainer media={media} isInBackdrop={true}/>
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