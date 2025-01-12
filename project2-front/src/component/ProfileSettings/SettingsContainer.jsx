import { SettingsProvider } from "./Context/SettingsProvider";
import BioTextField from "./ProfileSettingsFields/BioTextField";
import Banner from "./ProfileSettingsFields/Banner";
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
            width: '600px',
            height: 'auto',
            borderRadius: "8px",
          },
            overflow: 'hidden',
        }}
        onClose={handleCloseDialogBox}
      >
        <DialogTitle sx={{ textAlign: "center", fontWeight: "bold", fontSize: "23px" }}>
          Edit my profile
        </DialogTitle>
        <DialogContent>
          <Banner />
          <DisplayNameField />
          <BioTextField />
        </DialogContent>
        <DialogActions sx={{
            flexDirection: "column",
            justifyContent: "center"
        }}>
            <SubmitButton />
            <CancelButton />
        </DialogActions>
      </Dialog>
    </SettingsProvider>
  );
};
export default SettingsContainer;
