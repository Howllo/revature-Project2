import { Box, Typography } from "@mui/material";
import { useUserProfile } from "./Context/UseUserProfile";
<<<<<<< HEAD
import { useEffect, useState } from "react";

const ProfileBiography = ({ user }) => {
=======
import PropTypes from "prop-types";
import SignupSignIn from "../ReminderDialogBox/SignupSignIn.jsx";
import { useEffect, useState } from "react";

const ProfileBiography = ({user}) => {
>>>>>>> d10b0f0b465ce22f85f15232f43bc3b0e10e2010
  const [userData, setUserData] = useState(user);
  const { getUserData } = useUserProfile();

  useEffect(() => {
<<<<<<< HEAD
    const y = getUserData(user.username);
    y.then((value) => {
      setUserData(value);
    });
  });

=======
        const y = getUserData(user.username)
        y.then(value =>{
            setUserData(value)
        })
    });
>>>>>>> d10b0f0b465ce22f85f15232f43bc3b0e10e2010
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
        {userData.biography}
      </Typography>
    </Box>
  );
};

export default ProfileBiography;
