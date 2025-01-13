import { Box, Button, InputAdornment, OutlinedInput } from "@mui/material";
import { Link, useNavigate } from "react-router-dom"
import useNav from "../component/Navbar/NavContext/UseNav.jsx";
import EmailIcon from "@mui/icons-material/Email";
import LogOut from "../component/LogOut/LogOut.jsx";
import Cookies from "js-cookie";
import { useState } from "react";
import { projectApi } from "../util/axios.js";
import "./SettingPage.css"

const SettingsPage = () => {
  const [username, setUsername] = useState();
  const {currentNav} = useNav();
    let navigate  = useNavigate();

  const changeName = async (id) => {
    const token = Cookies.get("jwt");
    if (username === undefined) {
      return [];
    }

    try {
      const response = await projectApi.put(
        `/user/${id}/update/${username}`,
        
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (e) {
      console.error("Error getting search results for user: ", e.status);
    }
  };

  const handleDisplayNameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleDisplayChange = async () => {
    await changeName(Cookies.get("user_id"));
    Cookies.remove('jwt')
    Cookies.remove('username')
    navigate('/')
    window.location.reload(true)
  };

  return (
    <Box className="SettingPageContainer">
      <OutlinedInput className="SettingPageInputBar text" required type="text"
        value={username}
        onChange={(e) => handleDisplayNameChange(e)}
        placeholder="Enter new username"
        startAdornment={
          <InputAdornment position="start">
            <EmailIcon />
          </InputAdornment>
        }
      />
      <p>Note: Changing your username will log you out.</p>
      <Button className="SettingPageChangeNameButton" variant="contained" onClick={handleDisplayChange}>
        Change Name
      </Button>
      <LogOut />
    </Box>
  );
};

export default SettingsPage;
