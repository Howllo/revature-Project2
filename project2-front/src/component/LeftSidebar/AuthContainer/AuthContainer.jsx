import { Box, Drawer } from "@mui/material";
import Navbar from "../../Navbar/Navbar.jsx";
import "./AuthContainer.css";

const AuthContainer = () => {
  return (
    <Box className="AuthContainerLeftBar">
        <Drawer className="NavbarDrawer" variant="permanent">
            <Navbar/>
        </Drawer>
        <Box className="NavbarComponentElement">
            <Navbar/>
        </Box>
    </Box>
  );
};

export default AuthContainer;
