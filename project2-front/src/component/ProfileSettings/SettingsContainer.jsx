import { SettingsProvider } from "./Context/SettingsProvider";
import BioTextField from "./ProfileSettingsFields/BioTextField";
import Banner from "./ProfileSettingsFields/Banner";
import ProfilePictureInput from "./ProfileSettingsFields/ProfilePictureInput";
import DisplayNameField from "./ProfileSettingsFields/DisplayNameField";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useUserProfile } from "../UserProfile/Context/UseUserProfile";
import SubmitButton from "./ProfileSettingsFields/SubmitButton";
import CancelButton from "./ProfileSettingsFields/CancelButton";

const SettingsContainer = () => {
  const { isOpenDialogBox, handleCloseDialogBox } = useUserProfile();

  return (
    <SettingsProvider>
      <Dialog
        open={isOpenDialogBox}
        sx={{
          "& .MuiPaper-root": {
            width: { xs: "90%", sm: "500px" },
            height: { xs: "300px", sm: "500px" },
            borderRadius: "50px",
          },
        }}
        onClose={handleCloseDialogBox}
      >
        <DialogTitle sx={{ textAlign: "center" }}>
          Edit Your Profile
        </DialogTitle>
        <DialogContent>
          <Banner />
          <ProfilePictureInput />
          <DisplayNameField />
          <BioTextField />
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <SubmitButton />
        </DialogActions>
        <DialogActions sx={{ justifyContent: "center" }}>
          <CancelButton />
        </DialogActions>
      </Dialog>
    </SettingsProvider>
  );
};
export default SettingsContainer;
