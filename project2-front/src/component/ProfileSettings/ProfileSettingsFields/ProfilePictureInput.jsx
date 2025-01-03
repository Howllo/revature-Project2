import { Avatar, Box, IconButton, Input } from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
// import { useSettings } from "../Context/useSettings";
import { useContext } from "react";
import SettingsContext from "../Context/SettingsProvider";

const ProfilePictureInput = ({ width = 42, height = 42 }) => {
  let { setProfilePic } = useContext(SettingsContext);

  return (
    <Box>
      <Avatar
        alt="Profile Picture"
        src={"https://www.w3schools.com/howto/img_avatar.png"}
        sx={{
          borderColor: "rgb(212,217,225)",
          borderStyle: "solid",
          borderWidth: "1px",
          width: { width },
          height: { height },
        }}
      />
      <IconButton>
        <PhotoCameraIcon />
        <Input
          type="file"
          inputProps={{ accept: "images/*" }}
          sx={{ display: "none" }}
          onAbort={setProfilePic}
        />
      </IconButton>
    </Box>
  );
};

export default ProfilePictureInput;
