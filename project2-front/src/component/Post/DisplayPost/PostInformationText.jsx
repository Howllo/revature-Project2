import {Box, Typography} from "@mui/material";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

const PostText = ({display_name, username, post_date}) => {
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

    return (
        <Box
            sx={{
                display: 'flex',
                width: '100%',
                flexDirection: 'row',
            }}
        >
            <Box>
                <Link onClick={(e) => e.stopPropagation()} to={`/profile/${username}`}>
                  <Typography
                    variant="h6"
                    fontFamily="Inter, sans-serif"
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      textDecoration: "none",
                      "&:hover": {
                        textDecoration: "underline"
                      },
                      fontSize: '15px',
                      wordWrap: 'break-word',
                      overflow: 'hidden',
                      color: 'rgb(11, 15, 20)'

                    }}
                  >
                    {display_name}
                  </Typography>
                </Link>
            </Box>

            <Box>
                <Typography
                    variant="h6"
                    fontFamily="Inter, sans-serif"
                    sx={{
                        paddingLeft: '5px',
                        paddingTop: '2px',
                        flexDirection: 'row',
                        fontSize: '13px',
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
                    sx={{
                        display: 'flex',
                        paddingLeft: '5px',
                        paddingTop: '1px',
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
                    sx={{
                        display: 'flex',
                        paddingLeft: '5px',
                        paddingTop: '2px',
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
        </Box>
    )
}

PostText.propTypes = {
    display_name: PropTypes.string,
    username: PropTypes.string.isRequired,
    post_date: PropTypes.string,
    post: PropTypes.object,
};

export default PostText;