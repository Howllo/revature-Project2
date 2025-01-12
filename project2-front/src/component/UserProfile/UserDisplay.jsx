import { Box } from "@mui/material";
import UserAvatar from "../AvatarComponent/UserAvatar.jsx";
import { useUserProfile } from "./Context/UseUserProfile.jsx";

const UserDisplay = ({ user }) => {
  // const { settingsData } = useUserProfile();
  return (
    <Box>
      <Box>
        <img
          src={user.bannerPic || "https://picsum.photos/1500/500"}
          alt="Post Image"
          loading={"lazy"}
          style={{
            marginTop: "10px",
            width: "100%",
            height: "100%",
            borderRadius: "0px",
            maxWidth: "546px",
            maxHeight: "180px",
            minWidth: "546px",
            minHeight: "180px",
          }}
        />
        <Box
          sx={{
            mt: "-46px",
            ml: "-30px",
          }}
        >
          <UserAvatar
            username={user.username}
            image={user.profilePic}
            width={64}
            height={64}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default UserDisplay;
