import { Box } from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import SettingsContext from "../Context/SettingsProvider";
import { useContext, useRef } from "react";
import ProfilePictureInput from "./ProfilePictureInput.jsx";

const Banner = ({ user }) => {
  const { settingsData, handleBannerPicChange } =
    useContext(SettingsContext);
  const inputRef = useRef(null);
  const handleClick = () => {
    inputRef.current.click();
  };

  return (
    <Box
        sx={{
            cursor: 'pointer',
        }}
    >
        <Box
            onClick={handleClick}
            sx={{
              display: "flex",
              width: "100%",
              height: "175px",
              backgroundImage: `url(${
                  settingsData.bannerPreviewURL
                      ? settingsData.bannerPreviewURL
                      : settingsData.bannerPic
              })`,
              borderRadius: "2px",
              marginBottom: "10px",
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundColor: 'rgb(239,241,243)',
            }}
        >

          <Box
            sx={{
              display: "flex",
              width: "100%",
              height: "100%",
              mt: "-10px",
              mr: '10px',
              justifyContent: "end",
              alignItems: "end",
            }}
          >
            {/* Camera Icon */}
            <Box onClick={handleClick}
                 sx={{
                   display: "flex",
                   cursor: "pointer",
                   width: '27px',
                   height: '27px',
                   backgroundColor: "rgb(239,241,243)",
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
                }}
              />
            </Box>
          </Box>
            <input
                type="file"
                style={{ display: "none" }}
                ref={inputRef}
                onChange={(e) => {
                    handleBannerPicChange(e);
                }}
                accept="image/*"
            />
        </Box>

        <Box
            sx={{
                marginLeft: "10px",
                mt: '-80px'
            }}
        >
            <ProfilePictureInput width={85} height={85} />
        </Box>
    </Box>
  );
};
export default Banner;
