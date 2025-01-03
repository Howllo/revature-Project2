import { Button } from "@mui/material";
// import { useSettings } from "../Context/useSettings";
import { useContext } from "react";
import SettingsContext from "../Context/SettingsProvider";
import { useUserProfile } from "../../UserProfile/Context/UseUserProfile";

const CancelButton = () => {
  // const { resetSettingsData } = useContext(SettingsContext);
  const { handleCloseDialogBox } = useUserProfile();

  return (
    <Button
      variant="contained"
      onClick={handleCloseDialogBox}
      sx={{
        backgroundColor: "rgb(212,217,225)",
        color: "rgb(66, 87, 108)",
        fontWeight: 600,
        textTransform: "capitalize",
      }}
    >
      Cancel
    </Button>
  );
};
export default CancelButton;
