import { TextField } from "@mui/material";
// import { useSettings } from "../Context/useSettings";
import { useContext } from "react";
import SettingsContext from "../Context/SettingsProvider";
const DisplayNameField = () => {
  let { setDisplayName, settingsData } = useContext(SettingsContext);
  return (
    <TextField
      label="edit display name"
      placeholder="edit your display name"
<<<<<<< HEAD
      helperText="50 characters max"
=======
>>>>>>> 2db13914cb5997d2e3a9aca99de2caf7e8e86b6f
      maxLength={100}
      variant="outlined"
      sx={{
        marginBottom: "20px",

        width: "100%",
      }}
      value={settingsData.displayName}
      onChange={setDisplayName}
    />
  );
};

export default DisplayNameField;
