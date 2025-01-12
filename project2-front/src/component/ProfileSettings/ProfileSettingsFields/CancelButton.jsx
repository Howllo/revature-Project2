import { Button } from "@mui/material";
import SettingsContext from "../Context/SettingsProvider";
import { useUserProfile } from "../../UserProfile/Context/UseUserProfile";
import { useContext } from "react";

const CancelButton = () => {
  const { handleCloseDialogBox } = useUserProfile();
  const { resetSettingsData } = useContext(SettingsContext);

  return (
    <Button
        disableRipple={true}
        variant="text"
        onClick={() => {
            handleCloseDialogBox();
            resetSettingsData();
        }}
        sx={{
          "&:hover": {
              opacity: 0.8,
          },
        color: "black",
        fontSize: '16',
        fontWeight: 600,
        textTransform: "capitalize",
        borderRadius: '20px',
        width: '100%',
        }}
    >
      Cancel
    </Button>
  );
};
export default CancelButton;
