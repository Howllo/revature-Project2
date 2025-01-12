import { Box, Avatar } from "@mui/material";
import { useUserProfile } from "./Context/UseUserProfile.jsx";
import "./UserDisplay.css";

const UserDisplay = ({ user }) => {
  const { settingsData } = useUserProfile();
  return (
    <Box className="UserDisplayContainer">
        <img className="BannerImg"
             // src={settingsData.bannerPic || "https://picsum.photos/1500/500"}
             src={"https://picsum.photos/1500/500"}
             alt="Post Image" loading={"lazy"}/>
        <Box>
          <Avatar className="UserDisplayUserAvatar" image={settingsData.profilePic}/>
        </Box>
    </Box>
  );
};

export default UserDisplay;
