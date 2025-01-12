import {Box, IconButton, Typography} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const PostPage = () => {
    return (
        <Box>
            <Box
                sx={{

                }}
            >
                <IconButton>
                    <ArrowBackIcon />
                    <Typography variant="body2" color="textSecondary">
                        Post
                    </Typography>
                </IconButton>
            </Box>
        </Box>
    )
}

export default PostPage;