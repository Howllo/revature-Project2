import { Box } from "@mui/material";
import { SettingsProvider } from "./Context/SettingsProvider";
import BioTextField from "./ProfileSettingsFields/BioTextField";
import Banner from "./ProfileSettingsFields/Banner";
import ProfilePictureInput from "./ProfileSettingsFields/ProfilePictureInput";
import DisplayNameField from "./ProfileSettingsFields/DisplayNameField";
import Cookies from "js-cookie";

const SettingsContainer = () => {
  console.log(Cookies.get("displayName"));

  return (
    <SettingsProvider>
      <Box>
        <h3 style={{ textAlign: "center" }} className="header">
          Edit Your Profile
        </h3>
        <Banner />
        <ProfilePictureInput />
        <DisplayNameField />
        <BioTextField />
      </Box>
    </SettingsProvider>
  );
};
export default SettingsContainer;
