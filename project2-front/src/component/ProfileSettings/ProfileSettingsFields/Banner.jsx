import { Box, IconButton } from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import SettingsContext from "../Context/SettingsProvider";
import { useContext, useRef } from "react";
// import { useSettings } from "../Context/useSettings";

const Banner = () => {
  // source of the image
  // dimensions of the image
  const { setBannerPic } = useContext(SettingsContext);
  const inputRef = useRef(null);
  const handleClick = () => {
    inputRef.current.click();
    console.log("I got clicked");
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "25%",
        backgroundColor: "rgb(29, 161, 242)",
        borderRadius: "10px",
        marginBottom: "10px",
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
