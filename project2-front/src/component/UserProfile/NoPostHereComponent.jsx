import {Box, Typography} from "@mui/material";
import SpaIcon from '@mui/icons-material/Spa';

const NoPostHereComponent = () => {
  return (
    <Box
      sx={{
        marginTop: '30px',
        display: 'flex',
        flexDirection: 'column',
        width: '600px',
        height: '100vh',
        alignItems: 'center',
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
        <Box
          sx={{
            display: 'flex',
            borderRadius: '100%',
            width: '100px',
            height: '100px',
            backgroundColor: 'rgb(239,241,243)',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <SpaIcon
            sx={{
              color: 'rgb(168,182,195)',
              width: '55px',
              height: '55px',
            }}
          />
        </Box>

        <Typography
          variant="h6"
          color="secondary"
          sx={{
            marginTop: '10px',
            fontWeight: "400",
            fontSize: "17px",
            color: "rgb(65,86,107)",
            paddingLeft: "5px",
          }}
        >
          No posts yet.
        </Typography>
      </Box>
    </Box>
  )
}

export default NoPostHereComponent;