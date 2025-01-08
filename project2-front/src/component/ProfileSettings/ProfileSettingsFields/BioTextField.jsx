import TextField from "@mui/material/TextField";
// import { TextField } from "@mui/material";
// import { useSettings } from "./Context/useSettings";
import { useContext } from "react";
import SettingsContext from "../Context/SettingsProvider";
// import { TextField } from "@mui/material";
export default function BioTextField() {
  const { setBioText, settingsData } = useContext(SettingsContext);
  return (
    <TextField
      // label="edit your bio"
      placeholder="edit your bio"
      maxLength={400}
      variant="outlined"
      minRows={3}
      maxRows={5}
      value={settingsData.bioText}
      onChange={setBioText}
    />
  );
}
