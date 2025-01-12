import { Box, Typography } from "@mui/material";
import { usePost } from "../Post/Context/UsePost.jsx";
<<<<<<< HEAD
import { useEffect, useState } from "react";
import { useUserProfile } from "./Context/UseUserProfile.jsx";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
=======
import {useEffect, useState} from "react";
import { useUserProfile } from "./Context/UseUserProfile.jsx";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
>>>>>>> d10b0f0b465ce22f85f15232f43bc3b0e10e2010
import PropTypes from "prop-types";

const ProfileInformationPanel = ({ user }) => {
  const { listPostData, getUserPost } = usePost();
<<<<<<< HEAD
  const { getId, getUserData } = useUserProfile();
  const [userData, setUserData] = useState(user);
  const [time, setTime] = useState(null);

  useEffect(() => {
    const options = { year: "numeric", month: "long" };
    const date = new Date(user.joinDate);
    const formattedDate = date.toLocaleDateString("en-US", options);
    setTime(formattedDate);
=======
  const { getId, settingsData, getUserData } = useUserProfile();
  const [userData, setUserData] = useState(user);
    const [time, setTime] = useState(null);

  useEffect(() => {
      const options = { year: "numeric", month: "long" };
      const date = new Date(user.joinDate);
      const formattedDate = date.toLocaleDateString("en-US", options);
      setTime(formattedDate);
>>>>>>> d10b0f0b465ce22f85f15232f43bc3b0e10e2010

    const x = getId(user.username);
    x.then((value) => {
      getUserPost(value);
    });
<<<<<<< HEAD
    const y = getUserData(user.username);
    y.then((value) => {
      setUserData(value);
=======
    const y = getUserData(user.username)
    y.then(value =>{
        setUserData(value)
>>>>>>> d10b0f0b465ce22f85f15232f43bc3b0e10e2010
    });
  });

  return (
    <Box
      sx={{
        flexDirection: "column",
        display: "flex",
      }}
    >
      <Typography
        variant="h4"
        color="primary"
        sx={{
          fontWeight: "600",
          fontSize: "35px",
          color: "black",
          mt: "-15px",
          paddingLeft: "10px",
          paddingTop: "15px",
        }}
      >
        {userData.displayName || user.username}
      </Typography>

      <Typography
        variant="h6"
        color="secondary"
        sx={{
<<<<<<< HEAD
          fontWeight: "600",
          fontSize: "17px",
          mt: "-5px",
          color: "rgb(66, 87, 108)",
          paddingLeft: "10px",
=======
            fontWeight: "600",
            fontSize: "17px",
            mt: "-5px",
            color: "rgb(66, 87, 108)",
            paddingLeft: "10px",
>>>>>>> d10b0f0b465ce22f85f15232f43bc3b0e10e2010
        }}
      >
        @{user.username}
      </Typography>

      <Box
        sx={{
<<<<<<< HEAD
          display: "flex",
          flexDirection: "row",
          marginTop: "3px",
=======
            display: "flex",
            flexDirection: "row",
            marginTop: '3px'
>>>>>>> d10b0f0b465ce22f85f15232f43bc3b0e10e2010
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Typography
            variant="h6"
            color="primary"
            sx={{
              fontWeight: "800",
              fontSize: "15px",
              color: "rgb(11, 15, 20)",
              paddingLeft: "10px",
            }}
          >
            {userData.followerCount}
          </Typography>

          <Typography
            variant="h6"
            color="secondary"
            sx={{
              marginLeft: "5px",
              fontWeight: "400",
              fontSize: "15px",
              color: "rgb(66, 87, 108)",
            }}
          >
            followers
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Typography
            variant="h6"
            color="primary"
            sx={{
              marginLeft: "10px",
              fontFamily: "Inter, sans-serif",
              fontWeight: "800",
              fontSize: "15px",
              color: "rgb(11, 15, 20)",
            }}
          >
            {userData.followingCount}
          </Typography>

          <Typography
            variant="h6"
            color="secondary"
            sx={{
              marginLeft: "5px",
              fontFamily: "Inter, sans-serif",
              fontWeight: "400",
              fontSize: "15px",
              color: "rgb(66, 87, 108)",
            }}
          >
            following
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Typography
            variant="h6"
            color="primary"
            sx={{
              marginLeft: "10px",
              fontFamily: "Inter, sans-serif",
              fontWeight: "800",
              fontSize: "15px",
              color: "rgb(11, 15, 20)",
            }}
          >
            {listPostData.length}
          </Typography>

          <Typography
            variant="h6"
            color="secondary"
            sx={{
              marginLeft: "5px",
              fontFamily: "Inter, sans-serif",
              fontWeight: "400",
              fontSize: "15px",
              color: "rgb(66, 87, 108)",
            }}
          >
            posts
          </Typography>
        </Box>
      </Box>

<<<<<<< HEAD
      <Typography
        variant="h6"
        color="secondary"
        sx={{
          marginTop: "8px",
          fontWeight: "400",
          fontSize: "15px",
          color: "rgb(66, 87, 108)",
          paddingLeft: "10px",
          flexDirection: "row",
          paddingBottom: "1px",
        }}
      >
        <CalendarMonthIcon
          sx={{
            width: "16px",
            height: "16px",
            paddingTop: "1px",
          }}
        />
        Joined {time}
      </Typography>
=======
        <Typography
            variant="h6"
            color="secondary"
            sx={{
                marginTop: "8px",
                fontWeight: "400",
                fontSize: "15px",
                color: "rgb(66, 87, 108)",
                paddingLeft: "10px",
                flexDirection: 'row',
                paddingBottom: "1px",
            }}
        >
            <CalendarMonthIcon sx={{
                width: '16px',
                height: '16px',
                paddingTop: '1px',
            }}/>
            Joined {time}
        </Typography>
>>>>>>> d10b0f0b465ce22f85f15232f43bc3b0e10e2010
    </Box>
  );
};
ProfileInformationPanel.propTypes = {
<<<<<<< HEAD
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    followingCount: PropTypes.number.isRequired,
    followerCount: PropTypes.number.isRequired,
    joinDate: PropTypes.string.isRequired,
  }).isRequired,
=======
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        followingCount: PropTypes.number.isRequired,
        followerCount: PropTypes.number.isRequired,
        joinDate: PropTypes.string.isRequired,
    }).isRequired,
>>>>>>> d10b0f0b465ce22f85f15232f43bc3b0e10e2010
};

export default ProfileInformationPanel;
