import { Box } from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import SettingsContext from "../Context/SettingsProvider";
import { useContext, useRef } from "react";
import ProfilePictureInput from "./ProfilePictureInput.jsx";

const Banner = () => {
  const { settingsData, handleBannerPicChange, setUnapprovedBannerPic } =
    useContext(SettingsContext);
  const inputRef = useRef(null);
  const handleClick = () => {
    inputRef.current.click();
  };

  return (
    <Box>
        <Box
            onClick={handleClick}
            sx={{
                display: "flex",
                cursor: 'pointer',
                width: "100%",
                height: "150px",
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
                justifyContent: "end",
                alignItems: "end",
                padding: "10px",
            }}
        >
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
