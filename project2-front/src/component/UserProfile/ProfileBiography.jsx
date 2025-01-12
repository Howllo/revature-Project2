import { Box, Typography } from "@mui/material";
import { useUserProfile } from "./Context/UseUserProfile";

const ProfileBiography = ({ user }) => {
  // const { settingsData } = useUserProfile();
  return (
    <Box
      sx={{
        marginTop: "10px",
      }}
    >
      <Typography
        variant="h6"
        color="secondary"
        sx={{
          marginLeft: "5px",
          fontFamily: "Inter, sans-serif",
          fontWeight: "300",
          fontSize: "13px",
          color: "rgb(11, 15, 20)",
          paddingLeft: "10px",
        }}
      >
        {user.biography}
      </Typography>
    </Box>
  );
};

export default ProfileBiography;
