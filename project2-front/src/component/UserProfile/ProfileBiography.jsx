import { Box, Typography } from "@mui/material";
import { useUserProfile } from "./Context/UseUserProfile";
import { useEffect, useState } from "react";

const ProfileBiography = ({ user }) => {
  const [userData, setUserData] = useState(user);
  const { getUserData } = useUserProfile();

  useEffect(() => {
    const y = getUserData(user.username);
    y.then((value) => {
      setUserData(value);
    });
  });

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
        {userData.biography}
      </Typography>
    </Box>
  );
};

export default ProfileBiography;
