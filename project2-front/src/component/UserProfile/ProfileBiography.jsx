import {Box, Typography} from "@mui/material";

const ProfileBiography = () => {
  return (
      <Box
        sx={{
            marginTop: "10px"
        }}
      >
          <Typography variant="h6" color="secondary"
                      sx={{
                          marginLeft: '5px',
                          fontFamily: "Inter, sans-serif",
                          fontWeight: "300",
                          fontSize: "13px",
                          color: "rgb(11, 15, 20)",
                      }}
          >
              They used to call me The Drift King back in college.
              RTGame Feed: bsky.app/profile/rtga...

              Twitch: twitch.tv/rtgame
              YouTube: youtube.com/rtgame
              Insta: www.instagram.com/rtgamecrowd
          </Typography>
      </Box>
  )
}

export default ProfileBiography;