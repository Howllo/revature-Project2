import { SettingsProvider } from "./Context/SettingsProvider";
import BioTextField from "./ProfileSettingsFields/BioTextField";
import Banner from "./ProfileSettingsFields/Banner";
import ProfilePictureInput from "./ProfileSettingsFields/ProfilePictureInput";
import DisplayNameField from "./ProfileSettingsFields/DisplayNameField";

<<<<<<< HEAD
=======
// import Cookies from "js-cookie";
import { UserProfileProvider } from "../UserProfile/Context/UserProfileProvider";
>>>>>>> 2db13914cb5997d2e3a9aca99de2caf7e8e86b6f
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
<<<<<<< HEAD
=======
  console.log(isOpenDialogBox);
>>>>>>> 2db13914cb5997d2e3a9aca99de2caf7e8e86b6f

  return (
    <SettingsProvider>
      <Dialog
        open={isOpenDialogBox}
        sx={{
          "& .MuiPaper-root": {
<<<<<<< HEAD
            width: { xs: "90%", sm: "50%" },
            height: { xs: "300px", sm: "80%" },
=======
            width: { xs: "90%", sm: "500px" },
            height: { xs: "300px", sm: "500px" },
>>>>>>> 2db13914cb5997d2e3a9aca99de2caf7e8e86b6f
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
