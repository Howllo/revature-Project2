import TextField from "@mui/material/TextField";

import { useContext } from "react";
import SettingsContext from "../Context/SettingsProvider";
// import { TextField } from "@mui/material";
export default function BioTextField() {
  const { setBioText, settingsData } = useContext(SettingsContext);
  return (
    <TextField
      placeholder="edit your bio"
      maxLength={400}
      variant="outlined"
      multiline
      minRows={3}
      maxRows={5}
      value={settingsData.bioText}
      onChange={setBioText}
      fullWidth
    />
  );
}
