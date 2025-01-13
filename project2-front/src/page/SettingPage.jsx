import { Box, Button, InputAdornment, OutlinedInput } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LogOut from "../component/LogOut/LogOut.jsx";

import { useState } from "react";
import { projectApi } from "../util/axios.js";
import "./SettingPage.css"

const SettingsPage = () => {
  const [displayName, setDisplayName] = useState();

  const changeName = async (username) => {
    if (displayName === undefined) {
      return [];
    }

    try {
      const response = await projectApi.put(
        `/user/${username}/display_name`,
        {
          displayName: displayName,
        },
        {
          headers: {
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
    setDisplayName(e.target.value);
  };

  const handleDisplayChange = async () => {
    await changeName(displayName);
  };

  return (
    <Box className="SettingPageContainer">
      <OutlinedInput className="SettingPageInputBar text" required type="text"
        value={displayName}
        onChange={(e) => handleDisplayNameChange(e)}
        placeholder="Enter new display name"
        startAdornment={
          <InputAdornment position="start">
            <EmailIcon />
          </InputAdornment>
        }
      />

      <Button className="SettingPageChangeNameButton" variant="contained" onClick={handleDisplayChange}>
        Change Name
      </Button>
      <LogOut />
    </Box>
  );
};

export default SettingsPage;
