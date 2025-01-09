import { Avatar, Box, IconButton } from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
// import { useSettings } from "../Context/useSettings";
import { useContext, useRef } from "react";
import SettingsContext from "../Context/SettingsProvider";
// import { display, margin } from "@mui/system";

const ProfilePictureInput = ({ width = 42, height = 42 }) => {
  let { setProfilePic, settingsData } = useContext(SettingsContext);
  const inputRef = useRef(null);
  const handleClick = () => {
    inputRef.current.click();
  };

  return (
    <Box style={{ display: "flex", marginBottom: "10px" }}>
      <Avatar
        alt="Profile Picture"
        src={settingsData.profilePic}
        sx={{
          borderColor: "rgb(212,217,225)",
          borderStyle: "solid",
          borderWidth: "1px",
          width: { width },
          height: { height },
        }}
      />

      <IconButton onClick={handleClick}>
        <PhotoCameraIcon />
      </IconButton>
      <input
        type="file"
        // inputProps={{ accept: "images/*" }}
        style={{ display: "none" }}
        onChange={setProfilePic}
        ref={inputRef}
        accept="image/*"
      />
    </Box>
  );
};

export default ProfilePictureInput;
