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

const SettingsContainer = ({ user }) => {
  const { isOpenDialogBox, handleCloseDialogBox } = useUserProfile();

  return (
    <SettingsProvider>
      <Dialog
        open={isOpenDialogBox}
        sx={{
          "& .MuiPaper-root": {
            width: "600px",
            height: "auto",
            borderRadius: "8px",
            paddingLeft: "15px",
            paddingRight: "15px",
            paddingBottom: "15px",
            paddingTop: "5px",
          },
          overflow: "hidden",
        }}
        onClose={handleCloseDialogBox}
      >
        <DialogTitle sx={{ textAlign: "center" }}>
          Edit Your Profile
        </DialogTitle>
        <DialogContent>
          {" "}
          <Banner
            user={user}
          /> {/* <ProfilePictureInput user={user} /> */}{" "}
          <DisplayNameField user={user} /> <BioTextField user={user} />
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          {" "}
          <SubmitButton user={user} />
        </DialogActions>
        <DialogActions sx={{ justifyContent: "center" }}>
          {" "}
          <CancelButton />
        </DialogActions>
      </Dialog>
    </SettingsProvider>
  );
};
export default SettingsContainer;
