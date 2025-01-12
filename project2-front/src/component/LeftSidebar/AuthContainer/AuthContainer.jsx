import { Box } from "@mui/material";
import UserAvatar from "../../AvatarComponent/UserAvatar.jsx";
import Cookies from "js-cookie";
import Navbar from "../../Navbar/Navbar.jsx";
import "./AuthContainer.css";

const AuthContainer = () => {
  return (
    <Box className="AuthContainerLeftBar">
        <UserAvatar username={Cookies.get("username")} image={Cookies.get("profile_pic")}/>
        <Navbar/>
    </Box>
  );
};

export default AuthContainer;
