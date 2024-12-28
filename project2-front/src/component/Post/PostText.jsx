import {Box, Typography} from "@mui/material";
import PropTypes from "prop-types";

const PostText = ({comment}) => {
    return (
        <Box>
            <Typography
                variant="body2"
                fontFamily="Inter, sans-serif"
                sx={{
                    fontSize: '14px',
                    wordWrap: 'break-word',
                    overflow: 'hidden',
                    fontWeight: 400,
                    color: 'rgb(11, 15, 20)'
                }}
            >
                {comment}
            </Typography>
        </Box>
    )
}

PostText.propTypes = {
    comment: PropTypes.string.isRequired,
};

export default PostText;