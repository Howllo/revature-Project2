import { Box } from "@mui/material";
import { SettingsProvider } from "./Context/SettingsProvider";
import BioTextField from "./ProfileSettingsFields/BioTextField";
import Banner from "./ProfileSettingsFields/Banner";
import ProfilePictureInput from "./ProfileSettingsFields/ProfilePictureInput";
import DisplayNameField from "./ProfileSettingsFields/DisplayNameField";
import Cookies from "js-cookie";
import { UserProfileProvider } from "../UserProfile/Context/UserProfileProvider";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useUserProfile } from "../UserProfile/Context/UseUserProfile";
// import SubmitButton from "./ProfileSettingsFields/SubmitButton";
// import CancelButton from "./SettingsFields/CancelButton";

const SettingsContainer = () => {
  // console.log(Cookies.get("displayName"));
  const { isOpenDialogBox } = useUserProfile();
  console.log(isOpenDialogBox);

  return (
    <SettingsProvider>
      <Dialog
        open={isOpenDialogBox}
        sx={{
          "& .MuiPaper-root": {
            width: { xs: "90%", sm: "400px" },
            height: { xs: "300px", sm: "500px" },
          },
        }}
      >
        <DialogTitle>
          <h3 style={{ textAlign: "center" }} className="header">
            Edit Your Profile
          </h3>
        </DialogTitle>
        <DialogContent>
          <Banner />
          <ProfilePictureInput />
          <DisplayNameField />
          <BioTextField />
        </DialogContent>
        {/* <DialogActions>
            <SubmitButton />
            <CancelButton />
          </DialogActions> */}
      </Dialog>
    </SettingsProvider>
  );
};
export default SettingsContainer;
