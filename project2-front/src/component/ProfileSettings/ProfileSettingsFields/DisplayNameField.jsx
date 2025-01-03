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
      helperText="50 characters max"
      maxLength={100}
      variant="outlined"
      sx={{
        marginBottom: "20px",
      }}
      value={settingsData.displayName}
      onChange={setDisplayName}
    />
  );
};

export default DisplayNameField;
