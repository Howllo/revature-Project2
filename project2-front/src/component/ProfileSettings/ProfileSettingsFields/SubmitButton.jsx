import { Button } from "@mui/material";
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
        display: "flex",
        background: "linear-gradient(45deg, rgb(0, 161, 242) 30%, rgb(29, 140, 242) 70%)",
        color: "white",
        fontWeight: 600,
        textTransform: "capitalize",
        borderRadius: '20px',
        alignItems: "center",
        width: '94%',
      }}
      onClick={() => {
        handleSubmitSettings();
        handleCloseDialogBox();
      }}
    >
      Save Changes
    </Button>
  );
};
export default SubmitButton;
