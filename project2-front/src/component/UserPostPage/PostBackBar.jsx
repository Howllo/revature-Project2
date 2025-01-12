import {Box, IconButton, Typography} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const PostBackBar = () => {
  return(
    <Box
      sx={{
        width: '600px',
        height: '50px',
        borderBottom: '',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'rgb(212, 219, 226)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <IconButton sx={{ borderRadius: '13px' }} >
          <ArrowBackIcon sx={{ color: 'rgb(83,109,137)' }} />
        </IconButton>

        <Typography
          variant="h6"
          color="secondary"
          sx={{
            paddingTop: '3px',
            fontWeight: "700",
            fontSize: "22px",
            color: "rgb(11, 15, 20)",
            paddingLeft: "2px",
          }}
        >
          Post
        </Typography>
      </Box>
    </Box>
  )
}

export default PostBackBar;