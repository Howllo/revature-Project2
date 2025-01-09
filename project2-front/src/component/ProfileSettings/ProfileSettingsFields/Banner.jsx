import { Box, IconButton } from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import SettingsContext from "../Context/SettingsProvider";
import { useContext, useRef } from "react";

// import { useSettings } from "../Context/useSettings";

const Banner = () => {
  const { setBannerPic, settingsData } = useContext(SettingsContext);
  const inputRef = useRef(null);
  const handleClick = () => {
    inputRef.current.click();
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "30%",
        backgroundImage: `url(${settingsData.bannerPic})`,
        borderRadius: "10px",
        marginBottom: "10px",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <IconButton onClick={handleClick}>
        <PhotoCameraIcon />
      </IconButton>
      <input
        type="file"
        style={{ display: "none" }}
        ref={inputRef}
        onChange={setBannerPic}
        accept="image/*"
      />
    </Box>
  );
};
export default Banner;
