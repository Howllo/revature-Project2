import {Box, IconButton, Typography} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import useNav from "../Navbar/NavContext/UseNav.jsx";
import {useNavigate} from "react-router-dom";

const PostBackBar = () => {
  const { handleBack, history } = useNav();
  const navigate = useNavigate();

  const handleClick = () => {
    if(history.length <= 1){
      navigate("/");
    }
    handleBack();
  }

  return(
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        width: '597px',
        height: '51px',
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