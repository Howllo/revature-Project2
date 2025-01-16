import {Box} from "@mui/material";
// import { useUserProfile } from "./Context/UseUserProfile.jsx";
import "./UserDisplay.css";
import PropTypes from "prop-types";
// import { useEffect, useState } from "react";
import UserAvatar from "../AvatarComponent/UserAvatar.jsx";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useNavigate} from "react-router-dom";

const UserDisplay = ({ user }) => {
  // const [userData, setUserData] = useState(user);
  // const { getUserData } = useUserProfile();
  const navigate = useNavigate();

  // useEffect(() => {
  //   const y = getUserData(user.username);
  //   y.then((value) => {
  //     setUserData(value);
  //   });
  // }), [user];

  const handleBack = (e) => {
    e.preventDefault();
    e.stopPropagation();

    navigate('/');
  }

  return (
    <Box className="UserDisplayContainer">
      <img
        className="BannerImg"
        src={user.bannerPic || "https://picsum.photos/1500/500"}
        alt="Post Image"
        loading={"lazy"}
      />

      <Box className='BackButton' onClick={(e) => handleBack(e)}>
        <ArrowBackIcon className="BackButtonIcon" />
      </Box>

      <Box className="UserProfileAvatar">
        <UserAvatar
          className="UserDisplayUserAvatar"
          username={user.username}
          image={user.profilePic}
          width={105}
          height={105}
          border={true}
        />
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
