import { Avatar, Box } from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { useContext, useRef } from "react";
import SettingsContext from "../Context/SettingsProvider";
import PropTypes from "prop-types";

const ProfilePictureInput = ({ width = 42, height = 42 }) => {
  let { settingsData, handleProfilePicChange } =
    useContext(SettingsContext);
  const inputRef = useRef(null);
  const handleClick = () => {
    inputRef.current.click();
  };


  return (
    <Box
        onClick={handleClick}
        sx={{
            display: "flex",
            marginBottom: "10px"
    }}>
      <Avatar
        alt="Profile Picture"
        src={
          settingsData.profilePreviewURL
            ? settingsData.profilePreviewURL
            : settingsData.profilePic
        }
        sx={{
            cursor: "pointer",
            borderColor: "white",
            borderStyle: "solid",
            borderWidth: "2px",
            width: { width },
            height: { height },
            backgroundColor: "rgb(29,160,240)",
        }}
      />

      <Box
          zIndex={50}
        onClick={handleClick}
        sx={{
            display: "flex",
            cursor: "pointer",
            width: '28px',
            height: '28px',
            backgroundColor: "rgb(239,241,243)",
            mt: '58px',
            ml: '-25px',
            borderRadius: '100%',
            alignItems: 'center',
            justifyContent: 'center',
        }}
      >
        <PhotoCameraIcon
            sx={{
                width: '16px',
                height: '16px',
                opacity: '1',
                color: 'black',
            }} />
      </Box>

      <input
        type="file"
        style={{ display: "none" }}
        onChange={(e) => {
          handleProfilePicChange(e);
        }}
        ref={inputRef}
        accept="image/*"
      />
    </Box>
  );
};

ProfilePictureInput.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
};

export default ProfilePictureInput;
