import { Box, IconButton } from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import SettingsContext from "../Context/SettingsProvider";
import { useContext, useRef } from "react";

// import { useSettings } from "../Context/useSettings";

const Banner = () => {
  const { settingsData, handleBannerPicChange, setUnapprovedBannerPic } =
    useContext(SettingsContext);
  const inputRef = useRef(null);
  const handleClick = () => {
    inputRef.current.click();
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "30%",
        backgroundImage: `url(${
          settingsData.bannerPreviewURL
            ? settingsData.bannerPreviewURL
            : settingsData.bannerPic
        })`,
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
        onChange={(e) => {
          setUnapprovedBannerPic(e);
          handleBannerPicChange(e);
        }}
        accept="image/*"
      />
    </Box>
  );
};
export default Banner;
