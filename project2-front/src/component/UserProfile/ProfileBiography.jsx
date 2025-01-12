import { Box, Typography } from "@mui/material";
import { useUserProfile } from "./Context/UseUserProfile";
import PropTypes from "prop-types";
import SignupSignIn from "../ReminderDialogBox/SignupSignIn.jsx";

const ProfileBiography = () => {
  const { settingsData } = useUserProfile();
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
            marginBottom: '5px',
            fontFamily: "Inter, sans-serif",
            fontWeight: "400",
            fontSize: "15px",
            color: "rgb(11, 15, 20)",
            paddingLeft: "5px",
        }}
      >
        {settingsData.biography}
      </Typography>
    </Box>
  );
};

export default ProfileBiography;
