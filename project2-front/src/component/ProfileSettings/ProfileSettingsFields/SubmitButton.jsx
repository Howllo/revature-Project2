import { Button } from "@mui/material";
// import { useSettings } from "../Context/useSettings";
import { useContext } from "react";
import SettingsContext from "../Context/SettingsProvider";

const SubmitButton = () => {
  let { handleSubmitSettings } = useContext(SettingsContext);
  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: "rgb(29, 161, 242)",
        color: "white",
        fontWeight: 600,
        textTransform: "capitalize",
      }}
      onClick={handleSubmitSettings}
    >
      Submit Changes
    </Button>
  );
};
export default SubmitButton;
