import {Box, IconButton, Typography} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import useNav from "../Navbar/NavContext/UseNav.jsx";

const PostBackBar = () => {
  const { handleBack } = useNav();

  const handleClick = () => {
    handleBack();
  }

  return(
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        width: '600px',
        height: '50px',
        borderBottom: '',
        borderStyle: 'solid',
        borderWidth: 1,
        alignItems: 'center',
        borderColor: 'rgb(212, 219, 226)',
      }}
    >

      <IconButton onClick={handleClick} sx={{ borderRadius: '13px' }} >
        <ArrowBackIcon sx={{ color: 'rgb(83,109,137)' }} />
      </IconButton>

      <Typography
        variant="h6"
        color="secondary"
        sx={{
          fontWeight: "700",
          fontSize: "22px",
          color: "rgb(11, 15, 20)",
          paddingLeft: "2px",
        }}
      >
        Post
      </Typography>
    </Box>
  )
}

export default PostBackBar;