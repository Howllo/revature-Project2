import PropTypes from "prop-types";
import {Box, Typography} from "@mui/material";
import UserAvatar from "../../AvatarComponent/UserAvatar.jsx";
import {HorizontalRule} from "@mui/icons-material";
import MediaContainer from "../MediaContainer.jsx";
import Cookies from "js-cookie";

const ReplyContainer = ({post}) => {
  return (
    <Box
      sx={{
        marginTop: '10px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Box
          sx={{
            marginLeft: '10px',
          }}
        >
          <UserAvatar username={post.username} width={50} height={50} image={post.profile}/>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h6"
            color="secondary"
            sx={{
              marginLeft: "5px",
              marginBottom: "5px",
              fontFamily: "Inter, sans-serif",
              fontWeight: "600",
              fontSize: "15px",
              color: "rgb(11, 15, 20)",
              paddingLeft: "5px",
            }}
          >
            {post.displayName || post.username}
          </Typography>

          <Typography
            variant="h6"
            color="secondary"
            sx={{
              marginLeft: "5px",
              marginBottom: "5px",
              fontFamily: "Inter, sans-serif",
              fontWeight: "400",
              fontSize: "15px",
              color: "rgb(11, 15, 20)",
              paddingLeft: "5px",
            }}
          >
            {post.comment}
          </Typography>
        </Box>

        {post.media ? <Box
          sx={{
            display: "flex",
            marginLeft: "auto",
            width: "30%",
            height: "30%",
            paddingRight: post.media.includes('youtube') ? '70px' : '20px',
          }}
        >
          <MediaContainer media={post.media} isInPreview={true}/>
        </Box> : null}
      </Box>
      <HorizontalRule
        sx={{
          marginTop: '15px',
          marginBottom: '5px',
          color: 'rgb(212,217,225)',
          width: '100%',
          height: '1px',
          backgroundColor: 'rgb(212,217,225)',
        }}
      />
    </Box>
  )
}

ReplyContainer.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    username: PropTypes.string.isRequired,
    profile: PropTypes.string,
    displayName: PropTypes.string,
    postAt: PropTypes.string,
    comment: PropTypes.string.isRequired,
    commentCount: PropTypes.number,
    likeCount: PropTypes.number,
    media: PropTypes.string,
  }).isRequired,
}

export default ReplyContainer;