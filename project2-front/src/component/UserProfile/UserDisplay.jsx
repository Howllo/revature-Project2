import { Box } from "@mui/material";
import { useUserProfile } from "./Context/UseUserProfile.jsx";
import "./UserDisplay.css";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import UserAvatar from "../AvatarComponent/UserAvatar.jsx";

const UserDisplay = ({ user, avWidth, avHeight }) => {
  const [userData, setUserData] = useState(user);
  const { getUserData } = useUserProfile();

  useEffect(() => {
    const y = getUserData(user.username);
    y.then((value) => {
      setUserData(value);
    });
  }), [user];
  return (
    <Box className="UserDisplayContainer">
        <img className="BannerImg"
             src={userData.bannerPic || "https://picsum.photos/1500/500"}
             alt="Post Image" loading={"lazy"}/>
        <Box>
          <UserAvatar 
            className="UserDisplayUserAvatar" 
            username={user.username} 
            image={userData.profilePic} 
            width={avWidth}
            height={avHeight}/>
        </Box>
    </Box>
  );
};

UserDisplay.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }).isRequired,
  avWidth: PropTypes.number,
  avHeight: PropTypes.number,
};

export default UserDisplay;
