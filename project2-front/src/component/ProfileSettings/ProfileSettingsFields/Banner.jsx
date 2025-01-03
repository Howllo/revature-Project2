import { Box, Input, IconButton } from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import SettingsContext from "../Context/SettingsProvider";
import { useContext } from "react";
// import { useSettings } from "../Context/useSettings";

const Banner = () => {
  // source of the image
  // dimensions of the image
  const { setBannerPic } = useContext(SettingsContext);

  return (
    <Box
      sx={{
        width: "100%",
        height: "200px",
        backgroundColor: "rgb(29, 161, 242)",
        borderRadius: "10px",
        marginBottom: "10px",
      }}
    >
      <IconButton>
        <PhotoCameraIcon />
      </IconButton>
      <Input
        type="file"
        sx={{ display: "none" }}
        inputProps={{ accept: "image/*" }}
        onChange={setBannerPic}
      />
    </Box>
  );
};
export default Banner;
