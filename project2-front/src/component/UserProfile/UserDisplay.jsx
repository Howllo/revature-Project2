import { Box, Avatar } from "@mui/material";
import { useUserProfile } from "./Context/UseUserProfile.jsx";
import "./UserDisplay.css";
import PropTypes from "prop-types";
// import PostContainer from "../Post/DisplayPost/PostContainer.jsx";
import { useEffect, useState } from "react";

const UserDisplay = ({ user }) => {
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
            width={92}
            height={92}/>
        </Box>
    </Box>
  );
};

UserDisplay.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserDisplay;
