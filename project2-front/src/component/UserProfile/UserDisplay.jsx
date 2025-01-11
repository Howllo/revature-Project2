import { Box } from "@mui/material";
import UserAvatar from "../AvatarComponent/UserAvatar.jsx";
import Cookies from "js-cookie";

const UserDisplay = ({ user }) => {
  return (
    <Box>
      <Box>
        <img
          src={Cookies.get("banner_pic") || "https://picsum.photos/1500/500"}
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
            username={Cookies.get("username")}
            image={Cookies.get("profile_pic")}
            width={64}
            height={64}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default UserDisplay;
