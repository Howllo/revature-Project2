import { Button } from "@mui/material";
// import { useSettings } from "../Context/useSettings";
import { useContext } from "react";
import SettingsContext from "../Context/SettingsProvider";
import { useUserProfile } from "../../UserProfile/Context/UseUserProfile";

const SubmitButton = () => {
  const { handleSubmitSettings } = useContext(SettingsContext);
  const { handleCloseDialogBox } = useUserProfile();
  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: "rgb(29, 161, 242)",
        color: "white",
        fontWeight: 600,
        textTransform: "capitalize",
      }}
      onClick={() => {
        handleSubmitSettings();
        handleCloseDialogBox();
      }}
    >
      Submit Changes
    </Button>
  );
};
export default SubmitButton;
