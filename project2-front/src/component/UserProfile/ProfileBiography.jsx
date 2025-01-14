import { Box, Typography } from "@mui/material";
import { useUserProfile } from "./Context/UseUserProfile";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const ProfileBiography = ({ user }) => {
  const [userData, setUserData] = useState(user);
  const { getUserData } = useUserProfile();

  useEffect(() => {
    const y = getUserData(user.username);
    y.then((value) => {
      setUserData(value);
    });
  }, [user]);

  return (
    <Box
      sx={{
        marginTop: "5px",
        padding: "5px",
      }}
    >
      <Typography
        variant="h6"
        color="secondary"
        sx={{
          marginLeft: "5px",
          fontFamily: "Inter, sans-serif",
          fontWeight: "400",
          fontSize: "15px",
          color: "rgb(11, 15, 20)",
          paddingLeft: "5px",
        }}
      >
        {userData.biography}
      </Typography>
    </Box>
  );
};

ProfileBiography.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProfileBiography;
